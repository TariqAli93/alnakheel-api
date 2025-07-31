import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";

import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";

//Middlewares
import api_compression from "../middlewares/api_compression.middleware.js";
import global_error_handler from "../middlewares/global_error_handler.middleware.js";

// Initialize routes
import usersRouter from "../routes/users.route.js";
import propertiesRouter from "../routes/properties.route.js";
import clientsRouter from "../routes/clients.route.js";

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

// Global error handler should be after routes
app.use(global_error_handler);

app.use((req, res, next) => {
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "uploads", filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send("Image not found");
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" }); // أو نوع المحتوى المناسب
      res.end(data);
    }
  });
});

// Initialize routes
usersRouter(app);
propertiesRouter(app);
clientsRouter(app);

export default app;
