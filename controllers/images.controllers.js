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
      
      /*
      url
      filename
      mimetype
      size
      */ 

      const imageData = {
        url: imagePath.split('images')[1], // استخراج المسار من اسم الملف
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      };

      await imageModel.saveImage(imageData);
      // إرجاع استجابة بنجاح
      return res.status(201).json({
        message: 'Image uploaded successfully',
        image: {
          url: imageData.url,
          filename: imageData.filename,
          mimetype: imageData.mimetype,
          size: imageData.size
        },
        success: true
      });
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

