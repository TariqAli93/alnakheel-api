import * as imagesController from '../controllers/images.controllers.js';

const imagesRouter = (app) => {
  // Route to save an image
  app.post('/images/upload', imagesController.saveImage);
  // Route to delete an image by ID
  app.delete('/images/:id', imagesController.deleteImage);
};

export default imagesRouter;