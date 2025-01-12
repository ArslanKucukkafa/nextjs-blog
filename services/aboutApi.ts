import axios from "axios";
import { Education, Experience, Skill } from "./types";
import envConfig from "../env.config.js";
// About interface'ini export et
export interface About {
  id: string;
  name: string;
  location: string;
  email: string;
  status: string;
  currentCompany: string;
  jobTitle: string;
  aboutSelf: string;
  goal: string;
  education: Education[];
  experinces: Experience[];
  skills: Skill[];
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

export const aboutApi = {
  getAbout: async (): Promise<About> => {
    try {
      const response = await axios.get(`${API_URL}/about`, {
        headers: getHeaders(),
      });

      const data = response.data;
      console.log("Raw API Response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching about:", error);
      throw error;
    }
  },

  createOrUpdateAbout: async (about: About): Promise<About> => {
    try {
      const apiData = {
        ...about,
        skills: about.skills.map((skill) => ({
          skillName: skill.skillName,
          skillLevel: skill.skillLevel,
          skillDescription: skill.skillDescription,
        })),
      };

      const response = await axios.post(`${API_URL}/about`, apiData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating/updating about:", error);
      throw error;
    }
  },
};
