import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import helmet from "helmet";

import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";

//Middlewares
import api_compression from "../middlewares/api_compression.middleware.js";
import global_error_handler from "../middlewares/global_error_handler.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Initialize routes
import usersRouter from "../routes/users.route.js";
import propertiesRouter from "../routes/properties.route.js";
import clientsRouter from "../routes/clients.route.js";
import webMessagesRouter from "../routes/webMessages.route.js";
import propertyimagesRouter from "../routes/propertyimages.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

//Middlewares Init
app.use(helmet());
app.use(api_compression);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.status === 401) {
    res.status(401).sendFile(path.join(__dirname, "public", "errors", "401.html"));
  } else {
    next(err);
  }
});

// Global error handler should be after routes
app.use(global_error_handler);

// set authentication middleware as function to be used in specific routes
app.use("/api", authMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public")); // لخدمة ملفات public
app.use(express.static(path.join(__dirname, "images")));

// Initialize routes
usersRouter(app);
propertiesRouter(app);
clientsRouter(app);
webMessagesRouter(app);
propertyimagesRouter(app);

console.log("API is running on port 3003");

export default app;
