import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error.code === "P2002") {
    throw createHttpError(409, "Conflict: Duplicate entry");
  } else if (error.code === "P2025") {
    throw createHttpError(404, "Not Found: Record does not exist");
  }
  else {
    throw createHttpError(500, "Internal Server Error");
  }
};

const imageManagerService = {
  getImageById: async (id) => {
    try {
      const image = await prisma.images.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!image) {
        throw createHttpError(404, "Image not found");
      }
      return image;
    } catch (error) {
      console.error("Error fetching image by ID:", error);
      handlePrismaError(error);
    }
  },
  getAllImages: async () => {
    try {
      const images = await prisma.images.findMany();
      return images;
    } catch (error) {
      console.error("Error fetching all images:", error);
      handlePrismaError(error);
    }
  },
  createImage: async (imageData) => {
    try {
      const newImage = await prisma.images.create({
        data: imageData,
      });
      return newImage;
    }
    catch (error) {
      console.error("Error creating image:", error);
      handlePrismaError(error);
    }
  },
  updateImage: async (id, imageData) => {
    try {
      const updatedImage = await prisma.images.update({
        where: { id: parseInt(id, 10) },
        data: imageData,
      });
      return updatedImage;
    } catch (error) {
      console.error("Error updating image:", error);
      handlePrismaError(error);
    }
  },
  deleteImage: async (id) => {
    try {
      const deletedImage = await prisma.images.delete({
        where: { id: parseInt(id, 10) },
      });
      return deletedImage;
    } catch (error) {
      console.error("Error deleting image:", error);
      handlePrismaError(error);
    }
  }
};

export default imageManagerService;
