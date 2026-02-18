// API client configuration
import { handleApiError } from "../../utils/apiErrorHandler";
import { config } from "../../config";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || config.api.baseURL;

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    // Extract showToast option (default: true)
    const { showToast = true, ...requestOptions } = options;

    const config = {
      ...requestOptions,
      credentials: "include", // Include cookies in requests
      headers: {
        "Content-Type": "application/json",
        ...requestOptions.headers,
      },
    };

    try {
      console.log(config);
      const response = await fetch(url, config);
      console.log(response);

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }

      if (!response.ok) {
        // Create error with standard format
        const error = new Error(
          JSON.stringify({
            message: data.message || "Request failed",
            errors: data.errors || null,
          }),
        );
        error.status = response.status;
        error.data = data;

        // Handle API error (shows toast if enabled)
        handleApiError(error, { showToast });
        throw error;
      }

      return data;
    } catch (error) {
      // If error was already handled, rethrow it
      if (error.status) {
        throw error;
      }

      // Handle network errors or other unexpected errors
      const networkError = new Error(
        JSON.stringify({
          message:
            error.message || "Network error. Please check your connection.",
          errors: null,
        }),
      );
      handleApiError(networkError, { showToast });
      throw networkError;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }

  /**
   * Request without showing toast notifications
   * Useful for silent operations
   */
  requestSilent(endpoint, options = {}) {
    return this.request(endpoint, { ...options, showToast: false });
  }

  async download(endpoint, data) {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("ZIP download failed");
    }

    const blob = await response.blob();
    return blob;
  }
}

export const apiClient = new ApiClient();
