import * as clientController from "../controllers/clients.controller.js";

const clientsRouter = (app) => {
  app.get("/api/clients", clientController.getClients);
  app.get("/api/clients/:id", clientController.getClientById);
  app.post("/api/clients", clientController.createClient);
  app.put("/api/clients/:id", clientController.updateClient);
  app.delete("/api/clients/:id", clientController.deleteClient);
};

export default clientsRouter;
