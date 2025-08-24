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
    let text;
    try {
      text = await res.text();
    } catch {
      text = "";
    }
    const message = text || `API Error ${res.status}`;
    // Check for invalid/expired token and redirect to login
    if (
      res.status === 500 &&
      (message.includes("Invalid or expired token") ||
        message.toLowerCase().includes("token"))
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
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
    // New Transfer-specific endpoints (maps to Ballerina /document/transfer/...)
    getTransferByLandId: (id) =>
      fetch(`${API_BASE_URL}/document/transfer/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    registerTransfer: (body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${API_BASE_URL}/document/transferadd`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    updateTransfer: (id, body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${API_BASE_URL}/document/transfer/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    deleteTransfer: (id) =>
      fetch(`${API_BASE_URL}/document/transfer/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),

    // New Register-specific endpoints (maps to Ballerina /document/register/...)
    getRegisterByLandId: (id) =>
      fetch(`${API_BASE_URL}/document/register/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    registerRegister: (body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${API_BASE_URL}/document/registeradd`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    updateRegister: (id, body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${API_BASE_URL}/document/register/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    deleteRegister: (id) =>
      fetch(`${API_BASE_URL}/document/register/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    // Legacy / compatibility helpers: attempt transfer -> register -> legacy endpoints
    getByLandId: async (id) => {
      // Prefer transfer list
      try {
        if (apiClient.document.getTransferByLandId) {
          return await apiClient.document.getTransferByLandId(id);
        }
      } catch (e) {
        // ignore and try next
      }
      try {
        if (apiClient.document.getRegisterByLandId) {
          return await apiClient.document.getRegisterByLandId(id);
        }
      } catch (e) {
        // ignore and fallback
      }
      // Fallback legacy endpoint
      return fetch(`${API_BASE_URL}/document/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse);
    },
    register: async (body) => {
      const isForm = body && typeof body.append === "function";
      // Heuristic: detect transfer intent from JSON or FormData fields
      const looksLikeTransfer = (() => {
        try {
          if (isForm) {
            return (
              body.has("transferFor") ||
              body.has("transfer_for") ||
              body.get("property_type") === "transfer"
            );
          }
          if (body && typeof body === "object") {
            return (
              body.transferFor ||
              body.transfer_for ||
              body.property_type === "transfer"
            );
          }
        } catch (e) {
          return false;
        }
        return false;
      })();

      // Try preferred endpoint first
      if (looksLikeTransfer && apiClient.document.registerTransfer) {
        try {
          return await apiClient.document.registerTransfer(body);
        } catch (e) {
          // continue to other options
        }
      }

      // Try register-specific endpoint
      if (apiClient.document.registerRegister) {
        try {
          return await apiClient.document.registerRegister(body);
        } catch (e) {
          // continue
        }
      }

      // If not transfer/register specific, try transfer endpoint as a fallback
      if (!looksLikeTransfer && apiClient.document.registerTransfer) {
        try {
          return await apiClient.document.registerTransfer(body);
        } catch (e) {}
      }

      // Final fallback to legacy add
      return fetch(`${API_BASE_URL}/document/add`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    update: async (id, body) => {
      const isForm = body && typeof body.append === "function";
      // Try transfer update first
      if (apiClient.document.updateTransfer) {
        try {
          return await apiClient.document.updateTransfer(id, body);
        } catch (e) {}
      }
      // Then register update
      if (apiClient.document.updateRegister) {
        try {
          return await apiClient.document.updateRegister(id, body);
        } catch (e) {}
      }
      // Fallback to legacy
      return fetch(`${API_BASE_URL}/document/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    delete: async (id) => {
      // Try transfer delete
      if (apiClient.document.deleteTransfer) {
        try {
          return await apiClient.document.deleteTransfer(id);
        } catch (e) {}
      }
      // Try register delete
      if (apiClient.document.deleteRegister) {
        try {
          return await apiClient.document.deleteRegister(id);
        } catch (e) {}
      }
      // Fallback legacy
      return fetch(`${API_BASE_URL}/document/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse);
    },
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
  const getPropertyById = useCallback(
    (id) => apiClient.property.getById(id),
    []
  );
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
  const getDocumentsByLandId = useCallback(
    // Prefer transfer documents by default (matches backend change). Fall back to legacy when needed.
    (id) =>
      apiClient.document.getTransferByLandId
        ? apiClient.document.getTransferByLandId(id)
        : apiClient.document.getByLandId(id),
    []
  );
  // Compatibility: some pages expect getTransferByLandId directly from useApi
  const getTransferByLandId = useCallback(
    (id) =>
      apiClient.document.getTransferByLandId
        ? apiClient.document.getTransferByLandId(id)
        : apiClient.document.getByLandId(id),
    []
  );
  // Compatibility: expose register-by-landId for pages that need register-specific docs
  const getRegisterByLandId = useCallback(
    (id) =>
      apiClient.document.getRegisterByLandId
        ? apiClient.document.getRegisterByLandId(id)
        : apiClient.document.getByLandId(id),
    []
  );
  const registerProperty = useCallback(
    (body) => apiClient.property.register(body),
    []
  );

  return useMemo(
    () => ({
      getProperties,
      getPropertyById,
      getCurrentUserLands,
      getTransactions,
      getCurrentUserTransfers,
      getDocumentsByLandId,
      getRegisterByLandId,
      getTransferByLandId,
      registerProperty,
    }),
    [
      getProperties,
      getPropertyById,
      getCurrentUserLands,
      getTransactions,
      getCurrentUserTransfers,
      getDocumentsByLandId,
      getRegisterByLandId,
      registerProperty,
    ]
  );
};

export default apiClient;
