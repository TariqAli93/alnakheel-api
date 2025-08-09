import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { propertySchema } from "../validations/property.validation.js";

const prisma = new PrismaClient();

const normalizeProperties = (array) => {
  return array.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      if (typeof obj[key] === "number") {
        newObj[key] = obj[key].toString();
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  });
};

// normalizeObjects = { key: string }
const normalizeObjects = (object) => {
  const newObj = {};
  for (const key in object) {
    if (typeof object[key] === "number") {
      newObj[key] = object[key].toString();
    } else {
      newObj[key] = object[key];
    }
  }
  return newObj;
};

export const getProperties = async () => {
  try {
    const properties = await prisma.properties.findMany({
      include: {
        PropertyClient: {
          include: {
            client: true
          }
        },
        PropertyImages: {
          include: {
            image: true
          }
        },
        PropertyVideos: true
      },
      where: {
        is_deleted: false
      }
    });
    return properties;
  } catch (error) {
    throw createHttpError(500, "Internal server error", error);
  }
};
export const getPropertyById = async (id) => {
  if (!id) {
    throw createHttpError(400, "Property ID is required");
  }
  try {
    const property = await prisma.properties.findUnique({
      where: { id: parseInt(id), is_deleted: false },
      include: {
        PropertyClient: {
          include: {
            client: true
          }
        },
        PropertyImages: {
          include: {
            image: true
          }
        },
        PropertyVideos: true
      }
    });
    if (!property) {
      throw createHttpError(404, "Property not found");
    }
    return property;
  } catch (error) {
    throw createHttpError(500, "Internal server error");
  }
};
export const createProperty = async (data) => {
  try {
    const validData = propertySchema.parse(normalizeObjects(data));

    const newProperty = await prisma.properties.create({
      data: validData
    });

    const newClient = await prisma.client.create({
      data: {
        name: newProperty.owner,
        phone: newProperty.phone
      }
    });

    const clientInfo = {
      client_id: newClient.id,
      property_id: newProperty.id
    };

    await prisma.propertyClient.create({
      data: {
        clientId: clientInfo.client_id,
        propertyId: clientInfo.property_id
      }
    });

    return {
      property: newProperty,
      client: newClient
    };
  } catch (error) {
    throw createHttpError(500, "Property creation failed");
  }
};
export const createManyProperty = async (data) => {
  try {
    const validData = propertySchema.array().parse(normalizeProperties(data));
    let newProperties;
    let createdClient;
    let clientInfo;
    for (const item of validData) {
      newProperties = await prisma.properties.create({
        data: item
      });

      // Assuming each property has an owner field that corresponds to a client
      createdClient = await prisma.client.create({
        data: {
          name: item.owner,
          phone: item.phone
        }
      });

      clientInfo = {
        client_id: createdClient.id,
        property_id: newProperties.id
      };

      await prisma.propertyClient.create({
        data: {
          clientId: clientInfo.client_id,
          propertyId: clientInfo.property_id
        }
      });
    }

    return {
      properties: newProperties,
      client: createdClient
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw createHttpError(400, "Duplicate property data");
    }

    throw createHttpError(500, "Property creation failed", error);
  }
};
export const updateProperty = async (id, data) => {
  try {
    const validData = propertySchema.parse(normalizeObjects(data));
    const updatedProperty = await prisma.properties.update({
      where: { id: parseInt(id) },
      data: validData
    });
    return updatedProperty;
  } catch (error) {
    if (error.code === "P2025") {
      throw createHttpError(404, "Property not found", error);
    }
    throw createHttpError(500, "Property update failed", error);
  }
};
export const deleteProperty = async (id) => {
  try {
    const deletedProperty = await prisma.properties.update({
      where: { id: parseInt(id) },
      data: { is_deleted: true }
    });
    return deletedProperty;
  } catch (error) {
    throw createHttpError(500, "Property deletion failed", error);
  }
};
