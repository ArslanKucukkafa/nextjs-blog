import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// Persist edilmeyen loading state için store
const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Ana auth store
export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        console.log("Setting token in store:", {
          tokenExists: !!token,
          tokenLength: token?.length,
        });
        set({ token });

        // Token'ı cookie'ye manuel olarak kaydet
        if (token) {
          const authData = JSON.stringify({ state: { token } });
          document.cookie = `auth-storage=${encodeURIComponent(authData)}; path=/`;
        }
      },
      clearToken: () => {
        console.log("Clearing token and storage");
        set({ token: null });
        localStorage.removeItem("auth-storage");
        document.cookie =
          "auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrated state:", state);
      },
    },
  ),
);

// Birleştirilmiş store export
export const useFullAuthStore = () => {
  const authStoreState = authStore();
  const loadingStore = useLoadingStore();

  return {
    ...authStoreState,
    ...loadingStore,
  };
};
