import winston from "winston";
import moment from "moment-timezone";
import { Config } from "./index.js";

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { serviceName: "alnakheelApi" },
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz(Config.TZ).format()
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      level: "info",
      silent: Config.NODE_ENV === "test"
    })
  ]
});

export default logger;
