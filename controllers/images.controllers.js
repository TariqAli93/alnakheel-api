import * as imageModel from '../models/images.model.js';
import uploadService from '../services/upload.service.js';

export const saveImage = async (req, res, next) => {

  res.status(200).json({
    message: 'Image saved successfully',
    image: req,
    success: true,
  });
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await imageModel.deleteImage(id);
    res.status(200).json({
      message: 'Image deleted successfully',
      image: {
        id: image.id,
        url: image.url,
        filename: image.filename,
        mimetype: image.mimetype,
        size: image.size,
      },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

