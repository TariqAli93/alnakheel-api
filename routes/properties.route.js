import * as propertiesController from "../controllers/properties.controller.js";

const propertiesRouter = (app) => {
  app.get("/api/properties", propertiesController.getProperties);
  app.get("/api/properties/:id", propertiesController.getPropertyById);
  app.post("/api/properties", propertiesController.createProperty);
  app.post("/api/properties/many", propertiesController.createManyProperty);
  app.put("/api/properties/:id", propertiesController.updateProperty);
  app.delete("/api/properties/:id", propertiesController.deleteProperty);
};

export default propertiesRouter;
