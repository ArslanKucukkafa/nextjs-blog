import axios from "axios";
import envConfig from "@/env.config";

export interface Article {
  id: string;
  createdAt: string;
  tags: string[];
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
}

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

interface ArticleResponse {
  content: Article[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface SearchArticlesParams {
  pageCount?: number;
  pageSize?: number;
  sortType?: "ASC" | "DESC";
  search?: string;
  tags?: string[];
  visible?: boolean;
}

export const articleApi = {
  searchArticles: async (
    params: SearchArticlesParams = {}
  ): Promise<ArticleResponse> => {
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
        `${API_URL}/articles/search`,
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
      console.error("Error searching articles:", error);
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
              throw new Error("Articles not found");
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

  getArticle: async (id: string): Promise<Article> => {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  updateArticleVisibility: async (
    id: string,
    visible: boolean
  ): Promise<Article> => {
    try {
      const response = await axios.patch(
        `${API_URL}/articles/${id}/visibility`,
        { visible },
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating article visibility:", error);
      throw error;
    }
  },

  createArticle: async (article: Omit<Article, "id">): Promise<Article> => {
    try {
      const response = await axios.post(`${API_URL}/articles`, article, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  // Update article
  updateArticle: async (article: Article): Promise<Article> => {
    try {
      const response = await axios.put(`${API_URL}/articles`, article, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating article:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            document.cookie =
              "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to update article"
        );
      }
      throw error;
    }
  },

  // Delete article
  deleteArticle: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: getHeaders(),
      });
    } catch (error) {
      console.error("Error deleting article:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            document.cookie =
              "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to delete article"
        );
      }
      throw error;
    }
  },
};
