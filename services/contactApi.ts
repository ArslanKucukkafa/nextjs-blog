import axios from "axios";
import envConfig from "../env.config.js";

const API_URL = envConfig.getConfig("NEXT_PUBLIC_API_URL");

interface ContactRequest {
  subject: string;
  to: string;
  body: string;
}

export const contactApi = {
  sendEmail: async (request: ContactRequest) => {
    try {
      const response = await axios.post(`${API_URL}/contact/send`, request, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
      throw error;
    }
  },
};
