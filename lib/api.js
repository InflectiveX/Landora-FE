// ====== API BASE URLS (comment/uncomment as needed) ======
// Hosted URLs
// const HOST_BASE =
//   "https://e7f2b9c3-7f86-4a6b-91f9-2ae1c2e1c631-dev.e1-us-east-azure.choreoapis.dev/landora/landora";
// const AUTH_URL = `${HOST_BASE}/auth-476/v1.0`;
// const USER_URL = `${HOST_BASE}/user-27c/v1.0`;
// const PROPERTY_URL = `${HOST_BASE}/property-905/v1.0`;
// const TRANSFER_URL = `${HOST_BASE}/transfer-460/v1.0`;
// const DOCUMENT_URL = `${HOST_BASE}/document-9dc/v1.0`;
// const NFT_URL = `${HOST_BASE}/nft-7ad/v1.0`;
// const ADMIN_DASHBOARD_URL = `${HOST_BASE}/admin-dashboard/v1.0`;
// const USER_DASHBOARD_URL = `${HOST_BASE}/user-dashboard/v1.0`;

// Local URLs
const LOCAL_BASE = "http://localhost:3000/api";
const AUTH_URL = `${LOCAL_BASE}/auth`;
const USER_URL = `${LOCAL_BASE}/user`;
const PROPERTY_URL = `${LOCAL_BASE}/property`;
const TRANSFER_URL = `${LOCAL_BASE}/transfer`;
const DOCUMENT_URL = `${LOCAL_BASE}/document`;
const NFT_URL = `${LOCAL_BASE}/nft`;

// ====== SELECT ACTIVE ENDPOINTS ======
// Comment/uncomment to switch between hosted and local

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
    // Prefer concise message when server returned structured JSON
    let message = text || `API Error ${res.status}`;
    try {
      if (text) {
        const t = text.trim();
        if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
          const obj = JSON.parse(t);
          message = obj?.message || obj?.msg || obj?.error || message;
        } else {
          const m = t.match(/"message"\s*:\s*"([^\"]+)"/i);
          if (m && m[1]) message = m[1];
        }
      }
    } catch (e) {
      // fall back to raw text
    }
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
    const err = new Error(message);
    // mark so callers can avoid duplicate notifications
    try {
      err._apiEnqueued = true;
    } catch (e) {}
    throw err;
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
};

export const apiClient = {
  auth: {
    login: (body) =>
      fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (r) => {
        const data = await handleResponse(r);
        if (typeof data === "string") return { token: data };
        return data;
      }),
    protected: () =>
      fetch(`${AUTH_URL}/protected`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      }).then(handleResponse),
    adminResource: () =>
      fetch(`${AUTH_URL}/adminResource`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    forgotPassword: (email) =>
      fetch(`${AUTH_URL}/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then(handleResponse),
    resetPassword: (token, password) =>
      fetch(`${AUTH_URL}/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }).then(handleResponse),
  },
  user: {
    getDetails: () =>
      fetch(`${USER_URL}/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUser: () =>
      fetch(`${USER_URL}/currentuser`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getByNIC: async (nic) => {
      try {
        const res = await fetch(`${USER_URL}/userByNIC`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ nic }),
        });
        const data = await handleResponse(res);
        return data;
      } catch (e) {
        console.error("user.getByNIC failed", e);
        return null;
      }
    },
    register: (body) =>
      fetch(`${USER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(handleResponse),
    verify: (token) =>
      fetch(`${USER_URL}/verify?token=${token}`, {
        headers: { "Content-Type": "application/json" },
      }).then(handleResponse),
    addOfficer: (body) =>
      fetch(`${USER_URL}/addofficer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    blockUnblockUser: (body) =>
      fetch(`${USER_URL}/blockUnblockUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${USER_URL}/details/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    delete: (id) =>
      fetch(`${USER_URL}/details/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
  },
  property: {
    getDetails: () =>
      fetch(`${PROPERTY_URL}/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUserLands: () =>
      fetch(`${PROPERTY_URL}/currentUserLands`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getById: (id) =>
      fetch(`${PROPERTY_URL}/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${PROPERTY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${PROPERTY_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
  },
  transfer: {
    getDetails: () =>
      fetch(`${TRANSFER_URL}/details`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getCurrentUserTransfers: () =>
      fetch(`${TRANSFER_URL}/CurrentUserLandTransferDetails`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${TRANSFER_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${TRANSFER_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    delete: (id) =>
      fetch(`${TRANSFER_URL}/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
  },
  document: {
    getTransferByLandId: (id) =>
      fetch(`${DOCUMENT_URL}/transfer/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    registerTransfer: (body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${DOCUMENT_URL}/transferadd`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    updateTransfer: (id, body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${DOCUMENT_URL}/transfer/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    deleteTransfer: (id) =>
      fetch(`${DOCUMENT_URL}/transfer/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),

    getRegisterByLandId: (id) =>
      fetch(`${DOCUMENT_URL}/register/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    registerRegister: (body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${DOCUMENT_URL}/registeradd`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    updateRegister: (id, body) => {
      const isForm = body && typeof body.append === "function";
      return fetch(`${DOCUMENT_URL}/register/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    deleteRegister: (id) =>
      fetch(`${DOCUMENT_URL}/register/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    getByLandId: async (id) => {
      try {
        if (apiClient.document.getTransferByLandId) {
          return await apiClient.document.getTransferByLandId(id);
        }
      } catch (e) {}
      try {
        if (apiClient.document.getRegisterByLandId) {
          return await apiClient.document.getRegisterByLandId(id);
        }
      } catch (e) {}
      return fetch(`${DOCUMENT_URL}/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse);
    },
    register: async (body) => {
      const isForm = body && typeof body.append === "function";
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

      if (looksLikeTransfer && apiClient.document.registerTransfer) {
        try {
          return await apiClient.document.registerTransfer(body);
        } catch (e) {}
      }
      if (apiClient.document.registerRegister) {
        try {
          return await apiClient.document.registerRegister(body);
        } catch (e) {}
      }
      if (!looksLikeTransfer && apiClient.document.registerTransfer) {
        try {
          return await apiClient.document.registerTransfer(body);
        } catch (e) {}
      }
      return fetch(`${DOCUMENT_URL}/add`, {
        method: "POST",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    update: async (id, body) => {
      const isForm = body && typeof body.append === "function";
      if (apiClient.document.updateTransfer) {
        try {
          return await apiClient.document.updateTransfer(id, body);
        } catch (e) {}
      }
      if (apiClient.document.updateRegister) {
        try {
          return await apiClient.document.updateRegister(id, body);
        } catch (e) {}
      }
      return fetch(`${DOCUMENT_URL}/${id}`, {
        method: "PUT",
        headers: isForm
          ? { ...getAuthHeaders() }
          : { "Content-Type": "application/json", ...getAuthHeaders() },
        body: isForm ? body : JSON.stringify(body),
      }).then(handleResponse);
    },
    delete: async (id) => {
      if (apiClient.document.deleteTransfer) {
        try {
          return await apiClient.document.deleteTransfer(id);
        } catch (e) {}
      }
      if (apiClient.document.deleteRegister) {
        try {
          return await apiClient.document.deleteRegister(id);
        } catch (e) {}
      }
      return fetch(`${DOCUMENT_URL}/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      }).then(handleResponse);
    },
  },
  nft: {
    getByLandId: (id) =>
      fetch(`${NFT_URL}/${id}`, {
        headers: { ...getAuthHeaders() },
      }).then(handleResponse),
    register: (body) =>
      fetch(`${NFT_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      }).then(handleResponse),
    update: (id, body) =>
      fetch(`${NFT_URL}/${id}`, {
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
