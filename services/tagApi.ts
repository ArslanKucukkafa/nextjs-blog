import axios from "axios";
import envConfig from "../env.config.js";
import { authStore } from "@/store/authStore";

const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

// Helper function to get headers with token
const getHeaders = () => {
  const token = authStore.getState().token;
  return {
    Accept: "*/*",
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };
};

export const tagApi = {
  getProjectTags: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_URL}/projects/tags`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching project tags:", error);
      return [];
    }
  },

  getArticleTags: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_URL}/articles/tags`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching article tags:", error);
      return [];
    }
  },

  getPerspectiveTags: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_URL}/perspectives/tags`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching perspective tags:", error);
      return [];
    }
  },
};
