import { verifyJWTToken } from "../services/token.service.js";
export const authMiddleware = (req, res, next) => {
  // Example authentication logic
  const token = req.headers.authorization?.split(" ")[1];
  // const verified = verifyJWTToken(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const verified = verifyJWTToken(token);
      if (!verified) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  next();
};
