import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWebMessages = async () => {
  try {
    const webMessages = await prisma.webMessages.findMany({
      where: {
        is_deleted: false
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return webMessages;
  } catch (error) {
    next(createHttpError(500, "Failed to fetch web messages"));
  }
};

export const getWebMessageById = async (id) => {
  if (!id) {
    throw createHttpError(400, "Message ID is required");
  }
  try {
    const webMessage = await prisma.webMessages.findUnique({
      where: { id: parseInt(id), is_deleted: false }
    });
    if (!webMessage) {
      return next(createHttpError(404, "Web message not found"));
    }

    await prisma.webMessages.update({
      where: {
        id: parseInt(id)
      },
      data: {
        is_read: true
      }
    });
    return webMessage;
  } catch (error) {
    next(createHttpError(500, "Failed to fetch web message"));
  }
};

// Function to make all messages read
export const markAllMessagesAsRead = async () => {
  try {
    const result = await prisma.webMessages.updateMany({
      where: {
        is_read: false
      },
      data: {
        is_read: true
      }
    });
    return result;
  } catch (error) {
    next(createHttpError(500, "Failed to mark messages as read"));
  }
};

export const markAllMessagesAsDeleted = async () => {
  try {
    const result = await prisma.webMessages.updateMany({
      where: {
        is_deleted: false
      },
      data: {
        is_deleted: true
      }
    });
    return result;
  } catch (error) {
    next(createHttpError(500, "Failed to mark messages as deleted"));
  }
};

export const createWebMessage = async (data) => {
  try {
    const newWebMessage = await prisma.webMessages.create({
      data: {
        name: data.name,
        phone: data.phone,
        message: data.message
      }
    });
    return newWebMessage;
  } catch (error) {
    next(createHttpError(500, "Failed to create web message"));
  }
};

export const deleteWebMessage = async (id) => {
  if (!id) {
    throw createHttpError(400, "Message ID is required");
  }
  try {
    const deletedMessage = await prisma.webMessages.update({
      where: { id: parseInt(id) },
      data: { is_deleted: true, is_read: true }
    });

    return deletedMessage;
  } catch (error) {
    if (error.code === "P2025") {
      throw createHttpError(404, "Web message not found");
    }
    throw createHttpError(500, "Failed to delete web message");
  }
};

export const readWebMessage = async (id) => {
  if (!id) {
    throw createHttpError(400, "Message ID is required");
  }
  try {
    const updatedMessage = await prisma.webMessages.update({
      where: { id: parseInt(id) },
      data: { is_read: true }
    });
    return updatedMessage;
  } catch (error) {
    if (error.code === "P2025") {
      throw createHttpError(404, "Web message not found");
    }
    throw createHttpError(500, "Failed to mark web message as read");
  }
};
