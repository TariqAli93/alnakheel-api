import * as imagesController from '../controllers/images.controllers.js';

const imagesRouter = (app) => {
  app.post('/images/upload', imagesController.saveImage);
};

export default imagesRouter;