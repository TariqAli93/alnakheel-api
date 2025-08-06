// token service
import jwt from "jsonwebtoken";

const verifyJWTToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const decodeJWTToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { verifyJWTToken, decodeJWTToken };
