import { create } from "zustand";
import { authEndpoints } from "../../api/endpoints/auth";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login with email/password
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authEndpoints.login(email, password);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      // Token is stored in httpOnly cookie, no need to store in localStorage
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Login failed",
      });
      return { success: false, error: error.message };
    }
  },

  // Send OTP for signup
  sendSignupOTP: async (email, phone = null) => {
    // Don't set global isLoading to avoid GuestGuard showing loading screen
    set({ error: null });
    try {
      await authEndpoints.sendSignupOTP(email, phone);
      set({ error: null });
      return { success: true };
    } catch (error) {
      set({
        error: error.message || "Failed to send OTP",
      });
      return { success: false, error: error.message };
    }
  },

  // Verify OTP and complete signup
  verifySignupOTP: async (email, otp, phone = null, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authEndpoints.verifySignupOTP(
        email,
        otp,
        phone,
        password,
      );
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      // Token is stored in httpOnly cookie, no need to store in localStorage
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "OTP verification failed",
      });
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      await authEndpoints.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
      // Cookie is cleared by server, no need to remove from localStorage
    }
  },

  // Initialize auth state from cookie
  initializeAuth: async () => {
    // Prevent multiple simultaneous calls
    const currentState = get();
    if (currentState.isLoading) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await authEndpoints.getCurrentUser();
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null, // Don't set error on initial auth check
      });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
