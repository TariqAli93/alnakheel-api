// src/services/uploadService.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const imagesDir = path.join(process.cwd(), 'images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // تأكد من وجود مجلد الصور
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    // اسم ملف فريد مع الامتداد الأصلي
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

const uploadService = {
  /**
   * Middleware لرفع ملف واحد فقط
   * @param {string} fieldName - اسم الحقل في الفورم
   * @returns {Function} multer middleware
   */
  uploadSingle: (fieldName) => upload.single(fieldName),

  /**
   * Middleware لرفع ملفات متعددة
   * @param {string} fieldName - اسم الحقل في الفورم
   * @param {number} [maxCount=10] - أقصى عدد ملفات
   * @returns {Function} multer middleware
   */
  uploadMultiple: (fieldName, maxCount = 10) => upload.array(fieldName, maxCount),
};


export default uploadService;