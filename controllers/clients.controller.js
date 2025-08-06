import * as clientSModel from "../models/clients.model.js";

export const getClients = async (req, res, next) => {
  try {
    const clients = await clientSModel.getClients();
    res.status(200).json({
      message: "Clients retrieved successfully",
      data: clients,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving clients", success: false });
    next(error);
  }
};
export const getClientById = async (req, res, next) => {
  try {
    const client = await clientSModel.getClientById(req.params.id);
    res.status(200).json({
      message: "Client retrieved successfully",
      data: client,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving client", success: false });
    next(error);
  }
};
export const createClient = async (req, res, next) => {
  try {
    const client = await clientSModel.createClient(req.body);
    res.status(201).json({
      message: "Client created successfully",
      data: client,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating client", success: false });
    next(error);
  }
};
export const updateClient = async (req, res, next) => {
  try {
    const client = await clientSModel.updateClient(req.params.id, req.body);
    res.status(200).json({
      message: "Client updated successfully",
      data: client,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", success: false });
    next(error);
  }
};
export const deleteClient = async (req, res, next) => {
  try {
    await clientSModel.deleteClient(req.params.id);
    res.status(204).json({
      message: "Client deleted successfully",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", success: false });
    next(error);
  }
};
