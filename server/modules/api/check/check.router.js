const CheckController = require("./check.controller");

class CheckRouter {
  post = CheckController.postCheck;
  get = CheckController.getCheck;
  put = CheckController.updateCheck;
  delete = CheckController.deleteCheck;
}

module.exports = new CheckRouter();
