import axios from "axios";
import envConfig from "../env.config";

const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000, // 5 saniye timeout
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Cookie'den token'ı al
  const cookies = document.cookie.split(";");
  const accessToken = cookies.find((cookie) =>
    cookie.trim().startsWith("access_token=")
  );

  if (accessToken) {
    const token = decodeURIComponent(accessToken.split("=")[1]);
    config.headers.Authorization = token;
  }

  console.log("Request URL:", config.url);
  return config;
});

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
);

export const authApi = {
  githubLogin: () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const baseUrl = `${API_URL}/oauth2/authorization/github`;
    return `${baseUrl}?redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  handleGithubCallback: async () => {
    try {
      // Önce API'nin çalışıp çalışmadığını kontrol et
      const healthCheck = await api.get("/actuator/health").catch(() => null);
      if (!healthCheck) {
        console.error("Backend server is not accessible");
        return { success: false, message: "Backend server is not accessible" };
      }

      // Authentication durumunu kontrol et
      const authCheck = await api.get("/auth/check");
      console.log("Auth check response:", authCheck);

      if (authCheck.status === 200) {
        return { success: true, message: "Successfully logged in" };
      }

      return { success: false, message: "Authentication failed" };
    } catch (error: unknown) {
      console.error("GitHub callback error:", {
        message: error instanceof Error ? error.message : "Unknown error",
        response: (error as { response?: { data: unknown; status: number } })
          ?.response?.data,
        status: (error as { response?: { status: number } })?.response?.status,
      });

      return {
        success: false,
        message:
          (error as { response?: { data?: { message: string } } })?.response
            ?.data?.message || "Authentication failed",
      };
    }
  },

  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");
      return response.status === 200;
    } catch (error) {
      console.error("Check auth error:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      // Backend'e logout isteği gönder
      await api.post("/auth/logout");

      // Axios instance'ını sıfırla
      api.defaults.headers.common["Authorization"] = "";

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};
