import * as propertyImagesModel from '../models/propertyimages.model.js';
import imageManagerService from '../services/imageManager.services.js';
import uploadService from '../utils/file.utils.js'

export const createPropertyImage = async (req, res, next) => {
  try {
    uploadService.uploadSingle('image')(req, res, async (err) => {
      const { propertyId } = req.body
      console.log("Property ID:", propertyId);
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
      })
      const propertyImage = await propertyImagesModel.createPropertyImage(propertyId, image.id);
      res.status(201).json({
        message: "Property image created successfully",
        propertyImage: propertyImage,
        success: true
      });
    })
  } catch (error) {
    next(error);
  }
}

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
}

export const deletePropertyImage = async (req, res, next) => {
  const { propertyId, imageId } = req.params;
  try {
    const deletedPropertyImage = await propertyImagesModel.deletePropertyImage(propertyId, imageId);
    res.status(204).send({
      message: "Property image deleted successfully",
      deletedPropertyImage: deletedPropertyImage,
      success: true
    });
  } catch (error) {
    next(error);
  }
}
