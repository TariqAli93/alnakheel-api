import * as userController from "../controllers/users.controller.js";

const userService = {
  getById: userController.getUserById,
  create: userController.register,
  update: userController.updatedUser,
  delete: userController.deleteUser
};

export default userService;
