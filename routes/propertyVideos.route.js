import * as propertyVideosController from "../controllers/propertyVideos.controller.js";

const propertyVideosRouter = (app) => {
  app.post("/api/propertyvideos", propertyVideosController.createPropertyVideo);
  app.get("/api/propertyvideos/:propertyId", propertyVideosController.getPropertyVideos);
  app.put("/api/propertyvideos/:id", propertyVideosController.updatePropertyVideo);
  app.delete("/api/propertyvideos/:id", propertyVideosController.deletePropertyVideo);
};

export default propertyVideosRouter;
