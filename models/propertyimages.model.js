import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const createPropertyImage = async (propertyId, imageId) => {
  try {
    const propertyImage = await prisma.propertyImages.create({
      data: {
        propertyId: parseInt(propertyId, 10),
        imageId: imageId
      }
    })
    return propertyImage;
  } catch (error) {
    throw createHttpError(500, "Failed to create property image", error);
  }
}
export const getPropertyImages = async (propertyId) => {
  try {
    const propertyImages = await prisma.propertyImages.findMany({
      where: {
        propertyId: propertyId
      }
    })
    return propertyImages;
  } catch (error) {
    throw createHttpError(500, "Failed to retrieve property images");
  }
}
export const deletePropertyImage = async (propertyId, imageId) => {
  try {
    await prisma.propertyImages.delete({
      where: {
        propertyId: propertyId,
        imageId: imageId
      }
    })
  } catch (error) {
    throw createHttpError(500, "Failed to delete property image");
  }
}