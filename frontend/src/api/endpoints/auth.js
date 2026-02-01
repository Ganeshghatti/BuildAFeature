import { apiClient } from "../client";

export const authEndpoints = {
  // Signup with email OTP
  sendSignupOTP: (email, phone) =>
    apiClient.post("/auth/signup/send-otp", { email, phone }),

  verifySignupOTP: (name, email, otp, phone, password) =>
    apiClient.post("/auth/signup/verify-otp", {
      name,
      email,
      otp,
      phone,
      password,
    }),

  // Login with email/password
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),

  // Logout
  logout: () => apiClient.post("/auth/logout"),

  // Get current user (silent - no toast on error, used for auth check)
  getCurrentUser: () => apiClient.get("/auth/me", { showToast: false }),
};
