import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result?: unknown) => void,
) => void;

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://localhost:3000",
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      "*", // Be cautious with this in production
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization",
  ],
});

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        console.error("CORS Middleware Error:", result);
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
