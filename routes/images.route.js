import * as imagesController from '../controllers/images.controllers.js';

const imagesRouter = (app) => {
  app.post('/images/upload', imagesController.saveImage);
  app.delete('/images/:imageName', imagesController.deleteImage);
  app.get('/images/:imageName', imagesController.getImageByName);
  app.get('/images', imagesController.getAllImages);
};

export default imagesRouter;