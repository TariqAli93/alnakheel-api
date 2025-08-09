import * as propertyVideosModel from "../models/propertyVideos.model.js";

export const createPropertyVideo = async (req, res, next) => {
  const { url, videoPlatform, propertyId } = req.body;
  try {
    const propertyVideo = await propertyVideosModel.createPropertyVideo({
      url,
      videoPlatform: videoPlatform || "YOUTUBE",
      propertyId
    });
    res.status(201).json({
      message: "Property video created successfully",
      propertyVideo,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyVideos = async (req, res, next) => {
  try {
    const propertyVideos = await propertyVideosModel.getPropertyVideos(req.params.propertyId);
    res.status(200).json({
      message: "Property videos fetched successfully",
      propertyVideos,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyVideo = async (req, res, next) => {
  try {
    const propertyVideo = await propertyVideosModel.updatePropertyVideo(req.params.id, req.body);
    res.status(200).json({
      message: "Property video updated successfully",
      propertyVideo,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const deletePropertyVideo = async (req, res, next) => {
  try {
    await propertyVideosModel.deletePropertyVideo(req.params.id);
    res.status(204).json({
      message: "Property video deleted successfully",
      success: true
    });
  } catch (error) {
    next(error);
  }
};
