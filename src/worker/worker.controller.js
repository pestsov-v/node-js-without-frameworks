var _data = require("../../core/database/db.router");
var https = require("https");
var http = require("http");
var sendTwilioSms = require("../utils/sendSms");
var url = require("url");
const _logs = require("../logs");
const util = require("util");
const debug = util.debuglog("workers");
const workers = require("./workers");

class WorkerController {
  collectChecks() {
    _data.list("checks", function (err, checks) {
      if (!err && checks && checks.length > 0) {
        checks.forEach(function (check) {
          _data.read("checks", check, function (err, originalCheckData) {
            if (!err && originalCheckData) {
              workers.validateCheckData(originalCheckData);
            } else {
              debug("Error reading one of the check's data: ", err);
            }
          });
        });
      } else {
        debug("Error: Could not find any checks to process");
      }
    });
  }
}

module.exports = new WorkerController();
