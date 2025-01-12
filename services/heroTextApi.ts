import axios from "axios";
import { HeroText } from "./types/heroText";
import envConfig from "../env.config.js";

// Use the environment-specific configuration
const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");
console.log("Hero Text API - Environment API URL:", API_URL);

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

export const heroTextApi = {
  getHeroText: async (): Promise<HeroText> => {
    try {
      const response = await axios.get(`${API_URL}/hero-text`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hero text:", error);
      throw error;
    }
  },

  updateHeroText: async (heroText: HeroText): Promise<HeroText> => {
    try {
      const response = await axios.post(`${API_URL}/hero-text`, heroText, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating hero text:", error);
      throw error;
    }
  },
};
