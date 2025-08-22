// Prefer Next.js rewrite proxy to avoid CORS during development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API Error ${res.status}`);
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
  },
  property: {
    getDetails: () =>
      fetch(`${API_BASE_URL}/property/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getDetailsByUser: (userId) =>
      fetch(`${API_BASE_URL}/property/details/${userId}`, {
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
    getDetailsByUser: (userId) =>
      fetch(`${API_BASE_URL}/transfer/details/${userId}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${API_BASE_URL}/transfer/register`, {
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
  },
  document: {
    getByLandId: (id) =>
      fetch(`${API_BASE_URL}/document/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${API_BASE_URL}/document/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${API_BASE_URL}/document/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
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
  const getTransactions = useCallback(
    () => apiClient.transfer.getDetails(),
    []
  );
  const registerProperty = useCallback(
    (body) => apiClient.property.register(body),
    []
  );

  return useMemo(
    () => ({
      getProperties,
      getTransactions,
      registerProperty,
    }),
    [getProperties, getTransactions, registerProperty]
  );
};

export default apiClient;
