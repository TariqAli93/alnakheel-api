import * as webMessagesModel from "../models/webMessages.model.js";

export const getWebMessages = async (req, res) => {
  try {
    const messages = await webMessagesModel.getWebMessages();
    res.status(200).json({ message: "Web messages retrieved successfully", messages, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve web messages" });
  }
};

export const getWebMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await webMessagesModel.getWebMessageById(id);
    res.status(200).json({ message: "Web message retrieved successfully", message, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve web message" });
  }
};

// markAllMessagesAsRead
export const markAllMessagesAsRead = async (req, res) => {
  try {
    const result = await webMessagesModel.markAllMessagesAsRead();
    res.status(200).json({ message: "All web messages marked as read", result, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark all web messages as read" });
  }
};
// markAllMessagesAsDeleted
export const markAllMessagesAsDeleted = async (req, res) => {
  try {
    const result = await webMessagesModel.markAllMessagesAsDeleted();
    res.status(200).json({ message: "All web messages marked as deleted", result, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark all web messages as deleted" });
  }
};

// createWebMessage
export const createWebMessage = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  console.log("Creating web message with data:", req.body);

  try {
    const newMessage = await webMessagesModel.createWebMessage({
      name: req.body.name,
      phone: req.body.phone,
      message: req.body.message
    });

    res.status(201).json({ message: "Web message created successfully", newMessage, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create web message" });
  }
};

// deleteWebMessage
export const deleteWebMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await webMessagesModel.deleteWebMessage(id);
    res.status(200).json({ message: "Web message deleted successfully", deletedMessage, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete web message" });
  }
};

export const readWebMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await webMessagesModel.readWebMessage(id);
    res.status(200).json({ message: "Web message retrieved successfully", message, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve web message" });
  }
};
