import * as imagesController from '../controllers/images.controllers.js';

const imagesRouter = (app) => {
  // Route to save an image
  app.post('/images/upload', imagesController.saveImage);
};

export default imagesRouter;