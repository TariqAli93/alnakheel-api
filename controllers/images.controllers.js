import * as imageModel from '../models/images.model.js';
import fileService from '../services/file.service.js';

export const saveImage = async (req, res, next) => {
  try {
    // استخدام خدمة الرفع لرفع صورة واحدة
    fileService.uploadSingle('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error uploading image' });
      }
      if (!req.file) {
        return res.status(400).json({ 
          message: 'No file uploaded',
          success: false
        });
      }
      // حفظ مسار الصورة في قاعدة البيانات
      const imagePath = req.file.path;
    

      const imageData = {
        url: imagePath, // استخراج المسار من اسم الملف
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      };

      const savedImage = await imageModel.saveImage(imageData);
      // إرجاع استجابة بنجاح
      return res.status(201).json({
        message: 'Image uploaded successfully',
        image: {
          id: savedImage.id,
          url: savedImage.url,
          filename: savedImage.filename,
          mimetype: savedImage.mimetype,
          size: savedImage.size
        },
        success: true
      });
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await imageModel.getImageById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    await imageModel.deleteImage(parseInt(id));
    fileService.deleteFile(image.url);

    return res.status(204).json({ message: 'Image deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getImageByName = async (req, res, next) => {
  try {
    const { imageName } = req.params;
    const image = await imageModel.getImageByName(imageName);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json({  
      image,
      message: 'Image fetched successfully',
      success: true
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getImageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await imageModel.getImageById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json({
      image,
      message: 'Image fetched successfully',
      success: true
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllImages = async (req, res, next) => {
  try {
    const images = await imageModel.getAllImages();
    return res.status(200).json({
      images,
      message: 'Images fetched successfully',
      success: true
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};