import * as imageModel from '../models/images.model.js';
import uploadService from '../services/upload.service.js';

export const saveImage = async (req, res, next) => {
  try {
    // استخدام خدمة الرفع لرفع صورة واحدة
    uploadService.uploadSingle('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error uploading image' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      // حفظ مسار الصورة في قاعدة البيانات
      const imagePath = req.file.path;
      
      return res.status(201).json(imagePath);
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

