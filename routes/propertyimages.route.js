import * as propertyImagesController from '../controllers/propertyimages.controller.js';

const propertyimagesRouter = (app) => {
  app.post('/api/propertyimages', propertyImagesController.createPropertyImage);
  app.get('/api/propertyimages', propertyImagesController.getPropertyImages);
  app.delete('/api/propertyimages', propertyImagesController.deletePropertyImage);
}

export default propertyimagesRouter;