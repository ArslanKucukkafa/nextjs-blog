import axios from "axios";
import { Perspective } from "@/app/perspectives/types";
import envConfig from "../env.config";

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

interface PerspectiveResponse {
  content: Perspective[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface SearchPerspectivesParams {
  pageCount?: number;
  pageSize?: number;
  sortType?: "ASC" | "DESC";
  search?: string;
  tags?: string[];
  visible?: boolean;
}

export const perspectiveApi = {
  searchPerspectives: async (
    params: SearchPerspectivesParams = {}
  ): Promise<PerspectiveResponse> => {
    try {
      const {
        pageCount = 0,
        pageSize = 10,
        sortType = "ASC",
        tags = [],
        search = "",
        visible = true,
      } = params;

      const response = await axios.post(
        `${API_URL}/perspectives/search`,
        {
          pageCount,
          pageSize,
          sortType,
          tags,
          search,
          visible,
        },
        {
          headers: getHeaders(),
          timeout: 5000, // 5 seconds timeout
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching perspectives:", error);
      if (axios.isAxiosError(error)) {
        // More detailed error handling
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout - Server is not responding");
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          switch (error.response.status) {
            case 401:
              if (typeof window !== "undefined") {
                document.cookie =
                  "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/auth";
              }
              throw new Error("Unauthorized access");
            case 404:
              throw new Error("Perspectives not found");
            case 500:
              throw new Error("Internal server error");
            default:
              throw new Error(
                error.response.data?.message || "Network error occurred"
              );
          }
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error(
            "No response from server. Check your network connection."
          );
        } else {
          // Something happened in setting up the request
          throw new Error("Error setting up the request");
        }
      }
      throw error;
    }
  },

  getPerspective: async (id: string): Promise<Perspective> => {
    try {
      const response = await axios.get(`${API_URL}/perspectives/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching perspective:", error);
      throw error;
    }
  },

  createPerspective: async (
    perspective: Omit<Perspective, "id">
  ): Promise<Perspective> => {
    try {
      const response = await axios.post(
        `${API_URL}/perspectives`,
        perspective,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating perspective:", error);
      throw error;
    }
  },

  deletePerspective: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/perspectives/${id}`, {
        headers: getHeaders(),
      });
    } catch (error) {
      console.error("Error deleting perspective:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            document.cookie =
              "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to delete perspective"
        );
      }
      throw error;
    }
  },

  // Update perspective
  updatePerspective: async (perspective: Perspective): Promise<Perspective> => {
    try {
      const response = await axios.put(`${API_URL}/perspectives`, perspective, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating perspective:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            document.cookie =
              "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to update perspective"
        );
      }
      throw error;
    }
  },
};

export const getPerspectiveById = async (id: string): Promise<Perspective> => {
  const response = await fetch(`${API_URL}/perspectives/${id}`, {
    headers: {
      accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch perspective");
  }

  return response.json();
};
