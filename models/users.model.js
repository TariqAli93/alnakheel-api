import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const loginUser = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: { username }
    });
    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw createHttpError(500, "Login failed");
  }
};
export const createUser = async (data) => {
  try {
    const user = await prisma.users.create({
      data
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw createHttpError(500, "User creation failed");
  }
};
export const getUserByUsername = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: { username }
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw createHttpError(500, "User retrieval failed");
  }
};
export const getUserById = async (id) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw createHttpError(500, "User retrieval failed");
  }
};
export const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      orderBy: { created_at: "desc" }
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw createHttpError(500, "User retrieval failed");
  }
};
export const updateUser = async (id, data) => {
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw createHttpError(500, "User update failed");
  }
};
export const deleteUser = async (id) => {
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { is_deleted: true }
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw createHttpError(500, "User deletion failed");
  }
};

export const deleteUserPermanently = async (id) => {
  try {
    const user = await prisma.users.delete({
      where: { id: Number(id) }
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw createHttpError(500, "User deletion failed");
  }
};
