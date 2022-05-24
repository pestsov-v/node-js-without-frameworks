const userController = require("./user.controller");

let users = {};

users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    users[data.method](data, callback);
  } else {
    callback(405);
  }
};

users.post = userController.createUser;
users.get = userController.getUser;
users.put = userController.updateUser;
users.delete = userController.deleteUser;

module.exports = users;
