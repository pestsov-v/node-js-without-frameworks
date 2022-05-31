const LoggerController = require("./logger.controller");

class LoggerModule {
  append = LoggerController.append;
  list = LoggerController.list;
  compress = LoggerController.compress;
  decompress = LoggerController.decompress;
  truncate = LoggerController.truncate;
}

module.exports = new LoggerModule();
