const method = require("../../../../core/base/enum/method.enum");
const CheckRouter = require("./check.router");

let CheckModule = {};

CheckModule = function (data, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    CheckRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};

module.exports = CheckModule;
