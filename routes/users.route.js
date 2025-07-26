import * as userController from "../controllers/users.controller.js";

const usersRouter = (app) => {
  app.post("/api/users/login", userController.login);
  app.post("/api/users/register", userController.register);
  app.get("/api/users", userController.getAllUsers);
  app.get("/api/users/:id", userController.getUserById);
  app.get("/api/users/:username", userController.getUserByUsername);
  app.put("/api/users/:id", userController.updatedUser);
  app.delete("/api/users/:id", userController.deleteUser);
};

export default usersRouter;
