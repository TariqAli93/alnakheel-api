import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveImage = async (url,filename, mimetype, size) => {
  try {
    // تحقق من وجود ملف بنفس الاسم
    const existingImage = await prisma.images.findUnique({
      where: { url: filename },
    });

    if (existingImage) {
      throw createHttpError(400, "Image with this name already exists");
    }

    // حفظ الصورة في قاعدة البيانات
    const image = await prisma.images.create({
      data: {
        url: url,
        filename: filename,
        mimetype: mimetype,
        size: size,
      },
    });


    return image;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error");
  }
}

export const deleteImage = async (id) => {
  try {
    // تحقق من وجود الصورة
    const image = await prisma.images.findUnique({
      where: { id: id },
    });

    if (!image) {
      throw createHttpError(404, "Image not found");
    }

    // حذف الصورة من قاعدة البيانات
    await prisma.images.delete({
      where: { id: id },
    });

    return image;
  } catch (error) {
    throw createHttpError(500, "Internal Server Error");
  }
}
