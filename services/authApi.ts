import axios from "axios";
import envConfig from "../env.config.js";
import { authStore } from "@/store/authStore";

const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000, // 5 saniye timeout
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Auth store'dan token'ı al
  const state = authStore.getState();
  const token = state.token;

  if (token) {
    config.headers.Authorization = token;
    console.log("Adding token to request:", {
      url: config.url,
      hasToken: true,
    });
  } else {
    console.log("No token available for request:", config.url);
    console.log("Current auth state:", {
      token: token,
      tokenExists: !!token,
    });
  }

  return config;
});

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      url: response.config.url,
      status: response.status,
      hasData: !!response.data,
    });
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

const githubLogin = async () => {
  try {
    // First, get the authorization URL from backend
    const response = await api.get("/auth/github/login");
    console.log("Login URL response:", response.data);

    if (response.data?.url) {
      return response.data.url;
    }

    // Fallback to direct URL if backend doesn't provide one
    return `${API_URL}/oauth2/authorization/github`;
  } catch (error) {
    console.error("Error getting login URL:", error);
    // Fallback to direct URL in case of error
    return `${API_URL}/oauth2/authorization/github`;
  }
};

const handleGithubCallback = async (code: string) => {
  try {
    console.log("Handling GitHub callback with code:", code);
    const response = await api.post("/auth/github/callback", { code });
    console.log("Callback response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in GitHub callback:", error);
    throw error;
  }
};

const checkAuth = async () => {
  try {
    const response = await api.get("/auth/check");
    console.log("Auth check response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Auth check failed:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await api.post("/auth/logout");

    // Clear auth storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-storage");
      document.cookie =
        "auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      authStore.getState().clearToken();
    }

    // Auth sayfasına yönlendir
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
  } catch (error) {
    console.error("Logout failed:", error);
    // Hata durumunda da token ve storage'ı temizle
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-storage");
      document.cookie =
        "auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      authStore.getState().clearToken();
      window.location.href = "/auth";
    }
    throw error;
  }
};

export const authApi = {
  githubLogin,
  handleGithubCallback,
  checkAuth,
  logout,
};
