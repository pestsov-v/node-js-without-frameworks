const method = require("../../../core/base/enum/method.enum");
const UserRouter = require("./user.router");

UserModule = function (data, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    UserRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};

module.exports = UserModule;
