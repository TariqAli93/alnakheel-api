import * as webMessagesController from "../controllers/webMessages.controller.js";

const webMessagesRouter = (app) => {
  // getWebMessages
  app.get("/web/webMessages", webMessagesController.getWebMessages);
  // getWebMessageById
  app.get("/web/webMessages/:id", webMessagesController.getWebMessageById);
  // markAllMessagesAsRead
  app.put("/web/webMessages/read", webMessagesController.markAllMessagesAsRead);
  // markAllMessagesAsDeleted
  app.delete("/web/webMessages/delete", webMessagesController.markAllMessagesAsDeleted);
  // createWebMessage
  app.post("/web/webMessages", webMessagesController.createWebMessage);
  // deleteWebMessage
  app.delete("/web/webMessages/:id", webMessagesController.deleteWebMessage);

  // readWebMessage
  app.get("/web/webMessages/read/:id", webMessagesController.readWebMessage);
};

export default webMessagesRouter;
