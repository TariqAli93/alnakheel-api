import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients = async () => {
  try {
    const clients = await prisma.client.findMany();
    return clients;
  } catch (error) {
    throw createHttpError(500, "Failed to retrieve clients");
  }
};
export const getClientById = async (id) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(id) }
    });
    if (!client) {
      throw createHttpError(404, "Client not found");
    }
    return client;
  } catch (error) {
    throw createHttpError(500, "Failed to retrieve client");
  }
};
export const createClient = async (data) => {
  try {
    const client = await prisma.client.create({
      data: data
    });
    return client;
  } catch (error) {
    throw createHttpError(500, "Failed to create client");
  }
};
export const updateClient = async (id, data) => {
  try {
    const client = await prisma.client.update({
      where: { id: Number(id) },
      data
    });
    return client;
  } catch (error) {
    throw createHttpError(500, "Failed to update client");
  }
};
export const deleteClient = async (id) => {
  try {
    await prisma.client.delete({
      where: { id: Number(id) }
    });
  } catch (error) {
    throw createHttpError(500, "Failed to delete client");
  }
};
