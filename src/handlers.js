const _data = require("../core/database/db.router");
const config = require("../config/variables.config");
const helpers = require("./helpers");

let handlers = {};

handlers.index = function (data, callback) {
  if (data.method == "get") {
    helpers.getTemplate("index", function (err, str) {
      if (!err && str) {
        callback(200, str, "html");
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(400, undefined, "html");
  }
};

module.exports = handlers;
