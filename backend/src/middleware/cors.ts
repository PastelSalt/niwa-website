import cors from "cors";
import { getEnv } from "../config/env.js";

const env = getEnv();

export const corsMiddleware = cors({
  origin: env.FRONTEND_URL,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
