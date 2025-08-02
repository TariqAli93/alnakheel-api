import * as webMessagesController from "../controllers/webMessages.controller.js";

const webMessagesRouter = (app) => {
  // getWebMessages
  app.get("/api/webMessages", webMessagesController.getWebMessages);
  // getWebMessageById
  app.get("/api/webMessages/:id", webMessagesController.getWebMessageById);
  // markAllMessagesAsRead
  app.put("/api/webMessages/read", webMessagesController.markAllMessagesAsRead);
  // markAllMessagesAsDeleted
  app.delete("/api/webMessages/delete", webMessagesController.markAllMessagesAsDeleted);
  // createWebMessage
  app.post("/api/webMessages", webMessagesController.createWebMessage);
  // deleteWebMessage
  app.delete("/api/webMessages/:id", webMessagesController.deleteWebMessage);
};

export default webMessagesRouter;
