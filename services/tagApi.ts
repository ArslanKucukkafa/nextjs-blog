import axios from "axios";
import envConfig from "../env.config";
const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

export const tagApi = {
  getProjectTags: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_URL}/projects/tags`, {
        headers: {
          Accept: "*/*",
        },
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
        headers: {
          Accept: "*/*",
        },
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
        headers: {
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching perspective tags:", error);
      return [];
    }
  },
};
