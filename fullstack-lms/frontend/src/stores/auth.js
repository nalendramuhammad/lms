import { defineStore } from "pinia";
import api from "@/utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    logoutTimer: null,
  }),

  getters: {
    userRole: (state) => state.user?.role || "student",
    isAdmin: (state) => state.user?.role === "admin",
    isInstructor: (state) => state.user?.role === "instructor",
  },

  actions: {
    async register(userData) {
      try {
        const response = await api.post("/auth/register", userData);
        this.setAuth(response.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async login(credentials) {
      try {
        const response = await api.post("/auth/login", credentials);
        this.setAuth(response.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async getProfile() {
      try {
        const response = await api.get("/auth/me");
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async updateProfile(userData) {
      try {
        const response = await api.put("/auth/me", userData);
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      
      // Clear logout timer
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
      }
    },

    setAuth(data) {
      this.user = data.user;
      this.token = data.token;
      this.isAuthenticated = true;
      localStorage.setItem("token", data.token);
      this.startLogoutTimer();
    },

    async initializeAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await this.getProfile();
          this.startLogoutTimer();
        } catch (error) {
          // Token invalid, remove it
          this.logout();
        }
      }
    },

    startLogoutTimer() {
      // Clear existing timer
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
      }
      
      // Set new timer for 30 minutes (30 * 60 * 1000 ms)
      this.logoutTimer = setTimeout(() => {
        this.logout();
        // Redirect to login page
        if (window.location.pathname.startsWith('/cms')) {
          window.location.href = '/login';
        }
      }, 30 * 60 * 1000); // 30 minutes
    },

    resetLogoutTimer() {
      this.startLogoutTimer();
    },

    setupActivityListeners() {
      // Reset timer on user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const resetTimer = () => {
        if (this.isAuthenticated) {
          this.resetLogoutTimer();
        }
      };

      events.forEach(event => {
        document.addEventListener(event, resetTimer, true);
      });

      // Handle page visibility change
      const handleVisibilityChange = () => {
        if (document.hidden && this.isAuthenticated) {
          // User switched tabs or minimized browser
          // Logout after 5 minutes of inactivity
          setTimeout(() => {
            if (document.hidden && this.isAuthenticated) {
              this.logout();
              window.location.href = '/login';
            }
          }, 5 * 60 * 1000); // 5 minutes
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup function
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, resetTimer, true);
        });
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    },

    handleRouteChange(to) {
      // If user leaves CMS pages, logout immediately
      if (this.isAuthenticated && !to.path.startsWith('/cms') && to.path !== '/login') {
        this.logout();
        return false; // Prevent navigation
      }
      return true; // Allow navigation
    },
  },
});
