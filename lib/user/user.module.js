const UserRouter = require("./user.router");

let users = {};

users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    UserRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};

module.exports = users;
