const TokenRouter = require("./token.router");

let TokenModule = {};

TokenModule = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    TokenRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};

module.exports = TokenModule;
