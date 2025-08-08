import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
const prisma = new PrismaClient();

export const createPropertyImage = async (propertyId, imageId) => {
  try {
    const propertyImage = await prisma.propertyImages.create({
      data: {
        propertyId: Number(propertyId),
        imageId: Number(imageId)
      }
    });
    return propertyImage;
  } catch (error) {
    throw createHttpError(500, "Failed to create property image", { cause: error });
  }
};

export const getPropertyImages = async (propertyId) => {
  try {
    const propertyImages = await prisma.propertyImages.findMany({
      where: { propertyId: Number(propertyId) },
      include: { image: true } // <— حتى نجيب url والمعلومات من Images
    });
    return propertyImages;
  } catch (error) {
    throw createHttpError(500, "Failed to retrieve property images", { cause: error });
  }
};

// رجّع وصلة واحدة (propertyId + imageId)
export const getPropertyImage = async (propertyId, imageId) => {
  try {
    const link = await prisma.propertyImages.findFirst({
      where: {
        propertyId: Number(propertyId),
        imageId: Number(imageId)
      },
      include: { image: true } // image.url, image.filename, ...
    });
    return link;
  } catch (error) {
    throw createHttpError(500, "Failed to retrieve property image", { cause: error });
  }
};

// احذف وصلة واحدة فقط
export const deletePropertyImageLink = async (propertyId, imageId) => {
  try {
    const result = await prisma.propertyImages.deleteMany({
      where: {
        propertyId: Number(propertyId),
        imageId: Number(imageId)
      }
    });
    return result.count; // كم سطر انحذف
  } catch (error) {
    throw createHttpError(500, "Failed to delete property image link", { cause: error });
  }
};

// (اختياري) احذف كل صور عقار معيّن
export const deleteAllPropertyImages = async (propertyId) => {
  try {
    const result = await prisma.propertyImages.deleteMany({
      where: { propertyId: Number(propertyId) }
    });
    return result.count;
  } catch (error) {
    throw createHttpError(500, "Failed to delete property images", { cause: error });
  }
};
