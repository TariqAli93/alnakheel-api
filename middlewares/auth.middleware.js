import { verifyJWTToken } from "../services/token.service.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorPage = path.join(__dirname, "../", "public", "errors", "401.html");

function isBrowserRequest(req) {
  const accept = req.headers.accept || "";
  const ua = req.headers["user-agent"] || "";
  // شوف إذا الـ Accept فيه text/html (يعني أغلبها متصفح)
  // و User-Agent ليس فارغ
  return accept.includes("text/html") && ua && ua.toLowerCase().includes("mozilla");
}

export const authMiddleware = (req, res, next) => {
  // Example authentication logic
  const token = req.headers.authorization?.split(" ")[1];
  // const verified = verifyJWTToken(token);

  if (!token) {
    if (isBrowserRequest(req)) {
      return res.status(401).sendFile(errorPage);
    } else {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  } else {
    try {
      const verified = verifyJWTToken(token);
      if (!verified) {
        if (isBrowserRequest(req)) {
          return res.status(401).sendFile(errorPage);
        } else {
          return res.status(401).json({ message: "Unauthorized", success: false });
        }
      }
    } catch (error) {
      if (isBrowserRequest(req)) {
        return res.status(401).sendFile(errorPage);
      } else {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
    }
  }

  next();
};
