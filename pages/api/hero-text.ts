import type { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "../../lib/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Debugging logs
  console.log("Incoming Request Method:", req.method);
  console.log("Request Origin:", req.headers.origin);
  console.log("Frontend URL:", process.env.NEXT_PUBLIC_FRONTEND_URL);

  // CORS headers for all responses
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

  // Preflight handling
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await runMiddleware(req, res, cors);
  } catch (corsError) {
    console.error("CORS Middleware Error:", corsError);
    return res.status(500).json({
      error: "CORS Middleware Failed",
      details: corsError instanceof Error ? corsError.message : "Unknown error",
    });
  }

  // Method validation
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
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

export const config = {
  api: {
    bodyParser: false,
  },
};
