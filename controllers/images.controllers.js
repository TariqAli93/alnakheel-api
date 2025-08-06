import * as imageModel from '../models/images.model.js';
import uploadService from '../services/upload.service.js';

export const saveImage = async (req, res, next) => {
  console.log('saveImage called', req.file);
  try {
    const image = await uploadService.uploadImage(req.file);
    res.status(200).json({
      message: 'Image saved successfully',
      image,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

