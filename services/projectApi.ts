import axios from "axios";
import { Project } from "@/app/projects/types";
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

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 seconds timeout
axios.defaults.withCredentials = true; // Enable sending cookies

interface ProjectResponse {
  content: Project[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface SearchProjectsParams {
  pageCount?: number;
  pageSize?: number;
  sortType?: "ASC" | "DESC";
  search?: string;
  tags?: string[];
  visible?: boolean;
}

export const projectApi = {
  // Search projects with filters
  searchProjects: async (
    params: SearchProjectsParams = {},
  ): Promise<ProjectResponse> => {
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
        `${API_URL}/projects/search`,
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
          timeout: 5000, // 5 seconds timeout for this specific request
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching projects:", error);
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
                authStore.getState().clearToken();
                window.location.href = "/auth";
              }
              throw new Error("Unauthorized access");
            case 404:
              throw new Error("Projects not found");
            case 500:
              throw new Error("Internal server error");
            default:
              throw new Error(
                error.response.data?.message || "Network error occurred",
              );
          }
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error(
            "No response from server. Check your network connection.",
          );
        } else {
          // Something happened in setting up the request
          throw new Error("Error setting up the request");
        }
      }
      throw error;
    }
  },

  // Get single project
  getProject: async (id: string): Promise<Project> => {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  // Update project
  updateProject: async (project: Project): Promise<Project> => {
    try {
      // Remove any undefined or null values
      const cleanProject = Object.entries(project).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );

      console.log("API Request:", {
        url: `${API_URL}/projects`,
        data: cleanProject,
      });

      const response = await axios.put<Project>(
        `${API_URL}/projects`,
        cleanProject,
        {
          headers: getHeaders(),
          timeout: 10000, // 10 seconds timeout
        },
      );

      // Log response for debugging
      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout - Server is not responding");
        }
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            authStore.getState().clearToken();
            window.location.href = "/auth";
          }
        }
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(`API Error: ${errorMessage}`);
      }
      throw error;
    }
  },

  // Update project visibility
  updateProjectVisibility: async (
    id: string,
    isVisible: boolean,
  ): Promise<void> => {
    try {
      await axios.put(`${API_URL}/projects/visibility`, null, {
        headers: getHeaders(),
        params: { id, isVisible },
      });
    } catch (error) {
      console.error("Error updating project visibility:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            authStore.getState().clearToken();
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message ||
            "Failed to update project visibility",
        );
      }
      throw error;
    }
  },

  // Create project
  createProject: async (project: Omit<Project, "id">): Promise<Project> => {
    try {
      const response = await axios.post(`${API_URL}/projects`, project, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/projects`, {
        headers: getHeaders(),
        params: { id },
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            authStore.getState().clearToken();
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to delete project",
        );
      }
      throw error;
    }
  },

  // Sync projects
  syncProjects: async (): Promise<void> => {
    try {
      await axios.get(`${API_URL}/projects/sync`, {
        headers: getHeaders(),
        timeout: 30000, // 30 seconds timeout for sync operation
      });
    } catch (error) {
      console.error("Error syncing projects:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error("Sync timeout - Server is not responding");
        }
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            authStore.getState().clearToken();
            window.location.href = "/auth";
          }
        }
        throw new Error(
          error.response?.data?.message || "Failed to sync projects",
        );
      }
      throw error;
    }
  },
};
