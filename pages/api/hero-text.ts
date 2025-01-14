import type { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "../../lib/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Log incoming request details for debugging
  console.log("Incoming Request Method:", req.method);
  console.log("Request Headers:", req.headers);

  // Always set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    req.headers.origin || process.env.NEXT_PUBLIC_FRONTEND_URL || "*",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Run the CORS middleware
  try {
    await runMiddleware(req, res, cors);
  } catch (corsError) {
    console.error("CORS Middleware Error:", corsError);
    return res.status(500).json({
      error: "CORS Middleware Failed",
      details: corsError instanceof Error ? corsError.message : "Unknown error",
    });
  }

  // Ensure only GET method is allowed for this endpoint
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

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
