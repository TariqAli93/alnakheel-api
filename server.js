import https from "https";
import http from "http";
import app from "./app/app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";
import fs from "fs";
const PORT = Config.PORT;
const NODE_ENV = Config.NODE_ENV;

const sslOptions = {
  key: fs.readFileSync("./certs/private.key"),
  cert: fs.readFileSync("./certs/alnakhel_online.crt")
};

// const server = https.createServer(sslOptions, app);
const server = process.env.NODE_ENV === "production"
  ? https.createServer(sslOptions, app)
  : http.createServer(app);

server.listen(PORT, () => {
  if (NODE_ENV === "development") {
    logger.info(`[✨] Environment: ${Config.NODE_ENV} 🛠️`);
  } else if (NODE_ENV === "production") {
    logger.info(`[✨] Environment: ${Config.NODE_ENV} 🌐`);
  }
  logger.info(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  logger.error("Server error:", error);
});
