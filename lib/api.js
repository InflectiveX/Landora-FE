// Prefer Next.js rewrite proxy to avoid CORS during development

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

import { enqueue } from "./snackbar";

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    // If server returned a JSON error object, try to extract a friendly message
    let message = `API Error ${res.status}`;
    try {
      const parsed = text ? JSON.parse(text) : null;
      if (parsed && (parsed.message || parsed.error || parsed.reason)) {
        message = parsed.message || parsed.error || parsed.reason;
      } else if (typeof text === "string" && text.trim()) {
        // fallback to text, but keep it short
        message = text.length > 240 ? text.slice(0, 237) + "..." : text;
      }
    } catch (e) {
      // not JSON, use raw text (shortened)
      if (typeof text === "string" && text.trim()) {
        message = text.length > 240 ? text.slice(0, 237) + "..." : text;
      }
    }
    // Show snackbar for API errors (non-blocking)
    try {
      enqueue(message, { variant: "error" });
    } catch (e) {
      // ignore
    }
    throw new Error(message);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
};

export const apiClient = {
  auth: {
    login: (body) =>
      fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (r) => {
        const data = await handleResponse(r);
        // If string token returned, normalize to { token }
        if (typeof data === "string") return { token: data };
        return data;
      }),
    protected: () =>
      fetch(`${API_BASE_URL}/auth/protected`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      }).then(handleResponse),
    adminResource: () =>
      fetch(`${API_BASE_URL}/auth/adminResource`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    forgotPassword: (email) =>
      fetch(`${API_BASE_URL}/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then(handleResponse),
    resetPassword: (token, password) =>
      fetch(`${API_BASE_URL}/auth/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }).then(handleResponse),
  },
  user: {
    getDetails: () =>
      fetch(`${API_BASE_URL}/user/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUser: () =>
      fetch(`${API_BASE_URL}/user/currentuser`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getByNIC: async (nic) => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/userByNIC`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ nic }),
        });
        // handleResponse will show a toast on error and throw; catch here and return null
        const data = await handleResponse(res);
        return data;
      } catch (e) {
        // Already notified via handleResponse toast when possible; ensure UI gets null instead of throwing
        console.error("user.getByNIC failed", e);
        return null;
      }
    },
    register: (body) =>
      fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(handleResponse),
    verify: (token) =>
      fetch(`${API_BASE_URL}/user/verify?token=${token}`, {
        headers: { "Content-Type": "application/json" },
      }).then(handleResponse),
    addOfficer: (body) =>
      fetch(`${API_BASE_URL}/user/addofficer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${API_BASE_URL}/user/details/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    delete: (id) =>
      fetch(`${API_BASE_URL}/user/details/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
  },
  property: {
    getDetails: () =>
      fetch(`${API_BASE_URL}/property/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUserLands: () =>
      fetch(`${API_BASE_URL}/property/currentUserLands`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getById: (id) =>
      fetch(`${API_BASE_URL}/property/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${API_BASE_URL}/property/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${API_BASE_URL}/property/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
  },
  transfer: {
    getDetails: () =>
      fetch(`${API_BASE_URL}/transfer/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUserTransfers: () =>
      fetch(`${API_BASE_URL}/transfer/CurrentUserLandTransferDetails`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${API_BASE_URL}/transfer/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${API_BASE_URL}/transfer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    delete: (id) =>
      fetch(`${API_BASE_URL}/transfer/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
  },
  document: {
    getByLandId: (id) =>
      fetch(`${API_BASE_URL}/document/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) => {
      const isForm = body && typeof body.append === "function";
      // API uses /document/add for creating documents
      return fetch(`${API_BASE_URL}/document/add`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    update: (id, body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${API_BASE_URL}/document/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    delete: (id) =>
      fetch(`${API_BASE_URL}/document/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
  },
  nft: {
    getByLandId: (id) =>
      fetch(`${API_BASE_URL}/nft/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${API_BASE_URL}/nft/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${API_BASE_URL}/nft/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
  },
};

// Return memoized API methods so useEffect deps don't change each render
import { useCallback, useMemo } from "react";
export const useApi = () => {
  const getProperties = useCallback(() => apiClient.property.getDetails(), []);
  const getCurrentUserLands = useCallback(
    () => apiClient.property.getCurrentUserLands(),
    []
  );
  const getTransactions = useCallback(
    () => apiClient.transfer.getDetails(),
    []
  );
  const getCurrentUserTransfers = useCallback(
    () => apiClient.transfer.getCurrentUserTransfers(),
    []
  );
  const registerProperty = useCallback(
    (body) => apiClient.property.register(body),
    []
  );

  return useMemo(
    () => ({
      getProperties,
      getCurrentUserLands,
      getTransactions,
      getCurrentUserTransfers,
      registerProperty,
    }),
    [
      getProperties,
      getCurrentUserLands,
      getTransactions,
      getCurrentUserTransfers,
      registerProperty,
    ]
  );
};

export default apiClient;
