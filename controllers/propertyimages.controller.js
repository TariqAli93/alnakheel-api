import * as propertyImagesModel from '../models/propertyimages.model.js';

export const createPropertyImage = async (req, res, next) => {
  const { propertyId, imageId } = req.body;
  try {
    const propertyImage = await propertyImagesModel.createPropertyImage(propertyId, imageId);
    res.status(201).json({
      message: "Property image created successfully",
      propertyImage: propertyImage,
      success: true
    });
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
