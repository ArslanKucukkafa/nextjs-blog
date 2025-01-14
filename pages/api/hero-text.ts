import type { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "../../lib/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Your existing hero text logic
  try {
    // Example: Return mock hero text data
    res.status(200).json({
      title: "Welcome to My Blog",
      subtitle: "Exploring Technology and Innovation",
      description: "A personal blog about coding, tech, and life.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hero text",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Explicitly allow OPTIONS method for preflight requests
export const config = {
  api: {
    bodyParser: false, // Disable body parsing to allow CORS preflight
  },
};
