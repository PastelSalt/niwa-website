import dotenv from "dotenv";
dotenv.config();

import { createServer } from "node:http";
import { app } from "./app.js";
import { getEnv } from "./config/env.js";

const env = getEnv();

const server = createServer(app);

server.listen(env.PORT, () => {
  console.log(`NIWA API listening on port ${env.PORT} (${env.NODE_ENV})`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  console.error("Server error:", err);
  process.exit(1);
});

export default server;
