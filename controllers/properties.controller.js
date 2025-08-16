import * as PropertiesModel from "../models/properties.model.js";
import * as exportToExcel from "../utils/export.utils.js";

export const getProperties = async (req, res, next) => {
  try {
    const properties = await PropertiesModel.getProperties();
    res.json({
      success: true,
      data: properties,
      message: "Properties retrieved successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};
export const findPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await PropertiesModel.getPropertyById(id);
    res.json({
      success: true,
      data: property,
      message: "Property retrieved successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};
export const createProperty = async (req, res, next) => {
  try {
    const newProperty = await PropertiesModel.createProperty(req.body);
    res.status(201).json({
      success: true,
      data: newProperty,
      message: "Property created successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};
export const createManyProperty = async (req, res, next) => {
  try {
    const newProperties = await PropertiesModel.createManyProperty(req.body);
    res.status(201).json({
      success: true,
      data: newProperties,
      message: "Properties created successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProperty = await PropertiesModel.updateProperty(id, req.body);
    res.json({
      success: true,
      data: updatedProperty,
      message: "Property updated successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PropertiesModel.deleteProperty(id);
    res.json({
      success: true,
      message: "Property deleted successfully"
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
    next(error);
  }
};

export const exportProperties = async (req, res) => {
  // helper: تحقق كائن بسيط
  const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

  // helper: شكله يشبه سجل عقار
  const isPropertyLike = (o = {}) => {
    const keys = ["name", "type", "kind", "province", "district", "neighborhood", "street", "price", "area", "floors", "rooms", "bathrooms", "status", "createdAt", "created_at"];
    return keys.some((k) => Object.hasOwn(o, k));
  };

  try {
    let properties;

    // 1) إذا الـbody مصفوفة سجلات جاهزة
    if (Array.isArray(req.body)) {
      properties = req.body;

      // 2) إذا body كائن:
    } else if (isPlainObject(req.body) && Object.keys(req.body).length > 0) {
      // دعم صيغ شائعة: { properties: [...] } أو { data: [...] }
      if (Array.isArray(req.body.properties)) {
        properties = req.body.properties;
      } else if (Array.isArray(req.body.data)) {
        properties = req.body.data;

        // كائن يمثل سجل واحد فقط
      } else if (isPropertyLike(req.body)) {
        properties = [req.body];

        // أي شكل آخر ⇒ رجّع كل الداتا من الـDB
      } else {
        properties = await PropertiesModel.getProperties();
      }

      // 3) ماكو body ⇒ رجّع الكل
    } else {
      properties = await PropertiesModel.getProperties();
    }

    // 4) صدّر الملف وانهِ الرد
    await exportToExcel.exportPropertiesToExcel(properties, res);
    return;
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
    // إذا الهيدرز انرسلت، لا تحاول ترجع JSON
    res.destroy(error);
  }
};
