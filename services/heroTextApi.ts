import axios from "axios";
import { HeroText } from "./types/heroText";
import envConfig from "../env.config.js";
import { authStore } from "@/store/authStore";

// Use the environment-specific configuration
const API_URL = envConfig.NEXT_PUBLIC_API_URL;

// Helper function to get headers with token
const getHeaders = () => {
  const token = authStore.getState().token;
  return {
    Accept: "*/*",
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };
};

// Hata detaylarını loglamak için yardımcı fonksiyon
const logErrorDetails = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios Error Details:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
  } else if (error instanceof Error) {
    console.error("Standard Error:", {
      message: error.message,
      stack: error.stack,
    });
  } else {
    console.error("Unknown Error:", error);
  }
};

export const heroTextApi = {
  getHeroText: async (): Promise<HeroText> => {
    try {
      console.log(
        "Attempting to fetch Hero Text from:",
        `${API_URL}/hero-text`,
      );

      const response = await axios.get<HeroText>(`${API_URL}/hero-text`, {
        headers: {
          ...getHeaders(),
          Origin: window.location.origin,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error: unknown) {
      // Explicitly type the error if possible
      const processedError =
        error instanceof Error ? error : new Error(String(error));

      // Log the error details
      logErrorDetails(processedError);

      // Throw a new error with a consistent type
      throw processedError;
    }
  },

  updateHeroText: async (heroText: HeroText): Promise<HeroText> => {
    try {
      console.log("Attempting to update Hero Text to:", `${API_URL}/hero-text`);

      const response = await axios.put<HeroText>(
        `${API_URL}/hero-text`,
        heroText,
        {
          headers: getHeaders(),
          timeout: 10000, // 10 saniye timeout
        },
      );

      console.log("Hero Text Update Response:", response.data);
      return response.data;
    } catch (error: unknown) {
      // Hata detaylarını log et
      const processedError =
        error instanceof Error ? error : new Error(String(error));

      logErrorDetails(processedError);
      throw processedError;
    }
  },
};
