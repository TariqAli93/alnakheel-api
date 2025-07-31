import { verifyJWTToken } from "../services/token.service.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorPage = path.join(__dirname, "../", "public", "errors", "401.html");
export const authMiddleware = (req, res, next) => {
  // Example authentication logic
  const token = req.headers.authorization?.split(" ")[1];
  // const verified = verifyJWTToken(token);

  if (!token) {
    return res.status(401).sendFile(errorPage);
  } else {
    try {
      const verified = verifyJWTToken(token);
      if (!verified) {
        return res.status(401).sendFile(errorPage);
      }
    } catch (error) {
      return res.status(401).sendFile(errorPage);
    }
  }

  next();
};
