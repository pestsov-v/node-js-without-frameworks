const userController = require("./user.controller");

class UserRouter {
  post = userController.createUser;
  get = userController.getUser;
  put = userController.updateUser;
  delete = userController.deleteUser;
}

module.exports = new UserRouter();
