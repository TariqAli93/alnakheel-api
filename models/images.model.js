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


