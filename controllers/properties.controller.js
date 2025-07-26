import * as PropertiesModel from "../models/properties.model.js";

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
export const getPropertyById = async (req, res, next) => {
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
