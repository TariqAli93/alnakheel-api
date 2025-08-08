import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import fs from "fs/promises";

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
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // أو false لتعطيله
}));
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
app.use(express.static(path.join(process.cwd(), "images"))); // لخدمة ملفات الصور

app.get("/public/images", async (req, res) => {
  try {
    const dir = path.join(process.cwd(), "images");
    console.log(dir);
    const files = await fs.readdir(dir);
    // فلترة الامتدادات الشائعة
    const exts = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
    const images = files.filter(f => exts.has(path.extname(f).toLowerCase()));
    // رجّع أسماء + روابط جاهزة للوصول
    const result = images.map(name => ({
      name,
      url: `/images/${encodeURIComponent(name)}`
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list images" });
  }
});


app.get("/public/images/:name", (req, res) => {
  const safeName = path.basename(req.params.name); // يمنع ../
  const fullPath = path.join(process.cwd(), "images", safeName);

  // 👇 مهم: هيدرز تسمح بالعرض عبر cross-origin
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // يحل NotSameOrigin
  res.setHeader("Access-Control-Allow-Origin", "*");             // لو راح تستخدم الصورة في <canvas> أو تحميل عبر fetch
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

  // (اختياري) تحديد نوع المحتوى
  const ext = path.extname(safeName).toLowerCase();
  const m = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml" };
  if (m[ext]) res.type(m[ext]);

  res.sendFile(fullPath, err => {
    if (err) {
      res.status(err?.code === "ENOENT" ? 404 : 500).json({ error: "Not found" });
    }
  });
});


// Initialize routes
usersRouter(app);
propertiesRouter(app);
clientsRouter(app);
webMessagesRouter(app);
propertyimagesRouter(app);

export default app;
