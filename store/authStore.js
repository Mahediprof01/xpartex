import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: "buyer", // Default role
      isAuthenticated: false,

      login: (userData) => {
        set({
          user: userData,
          role: "buyer", // Always default to buyer on login
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          role: "buyer", // Reset to buyer on logout
          isAuthenticated: false,
        })
      },

      setRole: (newRole) => {
        set({ role: newRole })
      },

      toggleRole: () => {
        const currentRole = get().role
        set({ role: currentRole === "buyer" ? "seller" : "buyer" })
      },
    }),
    {
      name: "xpartex-auth",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export default useAuthStore
