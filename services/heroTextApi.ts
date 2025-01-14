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
    ...(token && { Authorization: `Bearer ${token}` }),
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
  getHeroText: async () => {
    try {
      console.log(
        "Attempting to fetch Hero Text from:",
        `${API_URL}/hero-text`,
      );

      const response = await axios.get<HeroText>(`${API_URL}/hero-text`, {
        headers: {
          Accept: "application/json",
        },
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

      const response = await axios.post<HeroText>(
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
      logErrorDetails(error);

      // Detaylı hata mesajı oluştur
      const errorMessage = axios.isAxiosError(error)
        ? `Network Error: ${error.message} (${error.code})`
        : error instanceof Error
          ? `Unexpected Error: ${error.message}`
          : "Unknown error occurred";

      // Hata detaylarını içeren özel bir hata nesnesi oluştur
      throw new Error(errorMessage);
    }
  },
};
