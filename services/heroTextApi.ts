import axios from "axios";
import { HeroText } from "./types/heroText";
import envConfig from "../env.config.js";

// Use the environment-specific configuration
const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

// Helper function to get headers with token
const getHeaders = () => {
  let token;
  if (typeof window !== "undefined") {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
  }

  return {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // CORS için ek başlık
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const heroTextApi = {
  getHeroText: async (): Promise<HeroText> => {
    try {
      console.log(
        "Attempting to fetch Hero Text from:",
        `${API_URL}/hero-text`
      );

      const response = await axios.get<HeroText>(`${API_URL}/hero-text`, {
        headers: getHeaders(),
        timeout: 10000, // 10 saniye timeout
        withCredentials: true, // CORS için kimlik bilgilerini dahil et
      });

      console.log("Hero Text Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Comprehensive Hero Text Fetch Error:", {
        fullError: error,
        message: error.message,
        code: error.code,
        config: error.config,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });

      // Detaylı hata mesajı oluştur
      const errorMessage = axios.isAxiosError(error)
        ? `Network Error: ${error.message} (${error.code})`
        : `Unexpected Error: ${error.message}`;

      // Hata detaylarını içeren özel bir hata nesnesi oluştur
      throw new Error(errorMessage);
    }
  },

  updateHeroText: async (heroText: HeroText): Promise<HeroText> => {
    try {
      console.log("Attempting to update Hero Text to:", `${API_URL}/hero-text`);

      const response = await axios.post<HeroText>(
        `${API_URL}/hero-text`,
        heroText,
        {
          headers: getHeaders(),
          timeout: 10000, // 10 saniye timeout
          withCredentials: true, // CORS için kimlik bilgilerini dahil et
        }
      );

      console.log("Hero Text Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Comprehensive Hero Text Update Error:", {
        fullError: error,
        message: error.message,
        code: error.code,
        config: error.config,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });

      // Detaylı hata mesajı oluştur
      const errorMessage = axios.isAxiosError(error)
        ? `Network Error: ${error.message} (${error.code})`
        : `Unexpected Error: ${error.message}`;

      // Hata detaylarını içeren özel bir hata nesnesi oluştur
      throw new Error(errorMessage);
    }
  },
};
