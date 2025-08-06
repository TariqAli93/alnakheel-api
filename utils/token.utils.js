import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  if (!user || !user.id || !user.username) {
    throw new Error("Invalid user object for token generation.");
  }
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };
  const secretKey = process.env.JWT_SECRET || "your-secret-key";
  const options = {
    expiresIn: "1d" // Set your desired expiration in days
  };
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET || "your-secret-key";
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
