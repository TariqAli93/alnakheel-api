import * as userModel from "../models/users.model.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import { generateToken, decodeToken } from "../utils/token.utils.js";

export const login = async (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Missing username or password", success: false });
  }
  try {
    const { username, password } = req.body;
    const user = await userModel.loginUser(username);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.is_banned) {
      return res.status(403).json({ message: "User is banned", success: false });
    }

    if (user.is_deleted) {
      return res.status(403).json({ message: "User is deleted", success: false });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "User is not active", success: false });
    }

    const token = generateToken(user);

    if (!token) {
      return res.status(500).json({ message: "Token generation failed", success: false });
    }

    res.status(200).json({
      message: "Login successful",
      token,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const register = async (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Missing username or password", success: false });
  }

  try {
    const { username, password, role } = req.body;
    const existingUser = await userModel.getUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.createUser({ username, password: hashedPassword, role });

    if (!newUser) {
      return res.status(500).json({ message: "User registration failed", success: false });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // 1) جلب التوكن بأمان
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    // 2) فك التوكن
    const dt = decodeToken(token); // تأكد أن الدالة ترمي خطأ لو التوقيع غير صالح

    // 3) جلب المستخدمين
    const allUsers = await userModel.getAllUsers();

    // 4) لو ADMIN → كل المستخدمين
    if (dt.role === "ADMIN") {
      const users = allUsers.map((u) => ({
        id: u.id,
        username: u.username,
        role: u.role,
        is_active: u.is_active,
        is_banned: u.is_banned,
        is_deleted: u.is_deleted
      }));

      return res.status(200).json({
        message: "Users retrieved successfully",
        users
      });
    }

    // 5) لو مو ADMIN → رجّع بس النشطين وغير المحذوفين وغير المحظورين
    const visibleUsers = allUsers
      .filter((u) => (u.is_active === 1 || u.is_active === true) && !u.is_deleted && !u.is_banned)
      .map((u) => ({
        id: u.id,
        username: u.username,
        role: u.role,
        is_active: u.is_active
      }));

    if (visibleUsers.length === 0) {
      return res.status(404).json({ message: "no user found", users: [] });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      users: visibleUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
    next?.(error);
  }
};
export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    const user = await userModel.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        is_active: user.is_active,
        is_banned: user.is_banned,
        is_deleted: user.is_deleted
      },
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};
export const getUserByUsername = async (req, res, next) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Username is required", success: false });
  }

  try {
    const user = await userModel.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        is_active: user.is_active,
        is_banned: user.is_banned,
        is_deleted: user.is_deleted
      },
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const undeleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    await userModel.updateUser(id, {
      is_deleted: false
    });

    res.status(200).json({
      message: "User undeleted successfully",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const activeUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    await userModel.updateUser(id, {
      is_active: true
    });

    res.status(200).json({
      message: "User activated successfully",
      success: true
    });
  } catch (error) {
    es.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const disactiveUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    await userModel.updateUser(id, {
      is_active: false
    });

    res.status(200).json({
      message: "User disactivated successfully",
      success: true
    });
  } catch (error) {
    es.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};

export const updatedUser = async (req, res, next) => {
  if (!req.body || !req.params.id) {
    return res.status(400).json({ message: "Missing user ID", success: false });
  }

  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.updateUser(Number(id), {
      username,
      password: hashedPassword,
      role
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    const deletedUser = await userModel.deleteUser(Number(id));

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User deleted successfully",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
  }
};
export const deleteUserPermanently = async (req, res, next) => {
  const { id } = req.params;

  const numId = Number(id);
  if (!numId || Number.isNaN(numId)) {
    return res.status(400).json({ message: "Valid user ID is required", success: false });
  }

  try {
    const deleted = await userModel.deleteUserPermanently(numId);

    if (!deleted) {
      // ماكو مستخدم بهذا الـ id
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User permanently deleted",
      success: true
    });
  } catch (error) {
    // FK constraint (مثلاً عنده علاقات تمنع الحذف)
    if (error.status === 409) {
      return res.status(409).json({ message: error.message, success: false });
    }
    // أي خطأ آخر
    res.status(500).json({ message: "Internal server error", success: false });
    next?.(error);
  }
};
