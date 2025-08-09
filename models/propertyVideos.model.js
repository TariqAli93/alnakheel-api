import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
const prisma = new PrismaClient();

export const createPropertyVideo = async (data) => {
  try {
    const propertyVideo = await prisma.propertyVideos.create({
      data
    });
    return propertyVideo;
  } catch (error) {
    throw createHttpError(500, "Error creating property video");
  }
};

export const getPropertyVideos = async (propertyId) => {
  try {
    const propertyVideos = await prisma.propertyVideos.findMany({
      where: { propertyId }
    });
    return propertyVideos;
  } catch (error) {
    throw createHttpError(500, "Error fetching property videos");
  }
};

export const updatePropertyVideo = async (id, data) => {
  try {
    const propertyVideo = await prisma.propertyVideos.update({
      where: { id },
      data
    });
    return propertyVideo;
  } catch (error) {
    throw createHttpError(500, "Error updating property video");
  }
};

export const deletePropertyVideo = async (id) => {
  try {
    await prisma.propertyVideos.delete({
      where: { id }
    });
  } catch (error) {
    throw createHttpError(500, "Error deleting property video");
  }
};
