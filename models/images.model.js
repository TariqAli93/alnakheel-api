import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveImage = async (imageData) => {
  try {
    // تحقق من وجود ملف بنفس الاسم
    const existingImage = await prisma.images.findFirst({
      where: {
        filename: imageData.filename
      },
    });

    if (existingImage) {
      throw createHttpError(400, "Image with this name already exists");
    }

    // حفظ الصورة في قاعدة البيانات
    const image = await prisma.images.create({
      data: imageData
    })


    return image;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error", {
      cause: error,
    });
  }
}


export const deleteImage = async (imageId) => {
  try {
    // حذف الصورة من قاعدة البيانات
    const deletedImage = await prisma.images.delete({
      where: {
        id: parseInt(imageId)
      }
    });

    return deletedImage;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error", {
      cause: error,
    });
  }
}

export const getImageByName = async (imageName) => {
  try {
    // جلب الصورة من قاعدة البيانات
    const image = await prisma.images.findFirst({
      where: {
        filename: imageName
      }
    });

    return image;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error", {
      cause: error,
    });
  }
};

export const getImageById = async (imageId) => {
  try {
    // جلب الصورة من قاعدة البيانات
    const image = await prisma.images.findFirst({
      where: {
        id: imageId
      }
    });

    return image;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error", {
      cause: error,
    });
  }
};

export const getAllImages = async () => {
  try {
    // جلب جميع الصور من قاعدة البيانات
    const images = await prisma.images.findMany();
    return images;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error", {
      cause: error,
    });
  }
};
