import * as propertyVideosController from "../controllers/propertyVideos.controller.js";

const propertyVideosRouter = (app) => {
  app.post("/api/property-videos", propertyVideosController.createPropertyVideo);
  app.get("/api/property-videos/:propertyId", propertyVideosController.getPropertyVideos);
  app.put("/api/property-videos/:id", propertyVideosController.updatePropertyVideo);
  app.delete("/api/property-videos/:id", propertyVideosController.deletePropertyVideo);
};

export default propertyVideosRouter;
