const method = require("../../core/base/enum/method.enum");
const TokenRouter = require("./token.router");

let TokenModule = {};

TokenModule = function (data, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    TokenRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};

module.exports = TokenModule;
