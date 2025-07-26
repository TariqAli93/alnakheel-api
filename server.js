import http from "http";
import app from "./app/app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";
const PORT = Config.PORT;
const NODE_ENV = Config.NODE_ENV;

const sslOptions = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem")
};

const server = http.createServer(sslOptions, app);

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
