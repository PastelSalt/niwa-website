import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import workspaceRoutes from "./routes/workspaces.js";
import itemRoutes from "./routes/items.js";
import searchRoutes from "./routes/search.js";
import focusRoutes from "./routes/focus.js";

export const app: Application = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(corsMiddleware);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "niwa-api" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/focus", focusRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
