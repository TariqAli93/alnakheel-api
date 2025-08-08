import * as propertyImagesModel from "../models/propertyimages.model.js";
import imageManagerService from "../services/imageManager.services.js";
import uploadService from "../utils/file.utils.js";

export const createPropertyImage = async (req, res, next) => {
  try {
    uploadService.uploadSingle("image")(req, res, async (err) => {
      const { propertyId } = req.body;
      if (err) {
        return next(err);
      }
      if (!req.file) {
        return next(new Error("No file uploaded"));
      }
      const image = await imageManagerService.createImage({
        url: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
      const propertyImage = await propertyImagesModel.createPropertyImage(propertyId, image.id);
      res.status(201).json({
        message: "Property image created successfully",
        propertyImage: propertyImage,
        success: true
      });
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyImages = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const propertyImages = await propertyImagesModel.getPropertyImages(propertyId);
    res.status(200).json({
      message: "Property images retrieved successfully",
      propertyImages: propertyImages,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const deletePropertyImage = async (req, res, next) => {
  try {
    // من الـ query حسب مسارك الحالي
    const propertyId = Number(req.query.propertyId);
    const imageId = Number(req.query.imageId);

    if (!propertyId || !imageId) {
      return res.status(400).json({ message: "propertyId and imageId are required" });
    }

    // جيب الوصلة + بيانات الصورة
    const link = await propertyImagesModel.getPropertyImage(propertyId, imageId);
    if (!link) {
      return res.status(404).json({ message: "Property image not found" });
    }

    // خذ مسار الملف من جدول Images
    const filePath = link.image?.url; // تأكد كيف تخزن المسار بالضبط (url أو path)

    // احذف الوصلة ثم الصورة (هنا نتجنب P2003)
    await propertyImagesModel.deletePropertyImageLink(propertyId, imageId);
    await imageManagerService.deleteImage(imageId);

    // أحذف الملف من القرص (بعد نجاح DB)
    if (filePath) {
      await uploadService.deleteFile(filePath);
    }

    // 200 OK مع رسالة (لا ترسل body مع 204)
    return res.status(200).json({
      message: "Property image deleted successfully",
      success: true
    });
  } catch (error) {
    next(error);
  }
};
