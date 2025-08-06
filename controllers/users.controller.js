import * as userModel from "../models/users.model.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/token.utils.js";

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
    const users = await userModel.getAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
        is_active: user.is_active,
        is_banned: user.is_banned,
        is_deleted: user.is_deleted
      })),
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    next(error);
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
