const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7256/api";

export class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

async function parseErrorResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const data = await response.json();
      if (typeof data === "string") {
        return data;
      }
      if (data.errors) {
        const validationErrors = Object.values(data.errors).flat().filter(Boolean);

        if (validationErrors.length > 0) {
          return validationErrors.join(" ");
        }
      }
      if (data.message) {
        return data.message;
      }
      if (data.detail) {
        return data.detail;
      }
      if (data.title) {
        return data.title;
      }
      return JSON.stringify(data);
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

function getDefaultErrorMessage(status) {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Authentication required. Please log in.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 500:
      return "A server error occurred. Please try again later.";
    default:
      return `Request failed with status ${status}.`;
  }
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, auth = false, headers = {} } = options;

  const requestHeaders = { ...headers };

  if (auth) {
    Object.assign(requestHeaders, getAuthHeaders());
  }

  if (body !== undefined && body !== null && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body:
      body !== undefined && body !== null
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
  });

  if (response.ok) {
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }

  const details = await parseErrorResponse(response);
  const message = details || getDefaultErrorMessage(response.status);

  throw new ApiError(message, response.status, details);
}

export { API_BASE_URL };
