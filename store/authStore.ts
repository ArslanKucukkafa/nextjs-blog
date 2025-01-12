import { create } from "zustand";
import { persist } from "zustand/middleware";

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
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

// Birleştirilmiş store export
export const useFullAuthStore = () => {
  const authStore = useAuthStore();
  const loadingStore = useLoadingStore();

  return {
    ...authStore,
    ...loadingStore,
  };
};
