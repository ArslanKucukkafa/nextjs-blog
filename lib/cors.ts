import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Define a more specific type for the middleware function
type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result?: unknown) => void,
) => void;

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "*", // Be more specific in production, e.g., 'https://yourdomain.com'
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Helper method to wait for a middleware to execute before continuing
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
