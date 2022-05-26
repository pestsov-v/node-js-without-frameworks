var path = require("path");
var fs = require("fs");
var _data = require("../core/database/db.router");
var https = require("https");
var http = require("http");
var sendTwilioSms = require("./utils/sendSms");
var url = require("url");
const _logs = require("./logs");

var workers = {};

workers.gatherAllChecks = function () {
  _data.list("checks", function (err, checks) {
    if (!err && checks && checks.length > 0) {
      checks.forEach(function (check) {
        _data.read("checks", check, function (err, originalCheckData) {
          if (!err && originalCheckData) {
            workers.validateCheckData(originalCheckData);
          } else {
            console.log("Error reading one of the check's data: ", err);
          }
        });
      });
    } else {
      console.log("Error: Could not find any checks to process");
    }
  });
};

workers.validateCheckData = function (originalCheckData) {
  originalCheckData =
    typeof originalCheckData == "object" && originalCheckData !== null
      ? originalCheckData
      : {};

  originalCheckData.id =
    typeof originalCheckData.id == "string" &&
    originalCheckData.id.trim().length == 20
      ? originalCheckData.id.trim()
      : false;

  originalCheckData.userPhone =
    typeof originalCheckData.userPhone == "string" &&
    originalCheckData.userPhone.trim().length == 10
      ? originalCheckData.userPhone.trim()
      : false;

  originalCheckData.protocol =
    typeof originalCheckData.protocol == "string" &&
    ["http", "https"].indexOf(originalCheckData.protocol) > -1
      ? originalCheckData.protocol
      : false;

  originalCheckData.url =
    typeof originalCheckData.url == "string" &&
    originalCheckData.url.trim().length > 0
      ? originalCheckData.url.trim()
      : false;

  originalCheckData.method =
    typeof originalCheckData.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(originalCheckData.method) > -1
      ? originalCheckData.method
      : false;

  originalCheckData.code =
    typeof originalCheckData.code == "object" &&
    originalCheckData.code instanceof Array &&
    originalCheckData.code.length > 0
      ? originalCheckData.code
      : false;

  originalCheckData.time =
    typeof originalCheckData.time == "number" &&
    originalCheckData.time % 1 === 0 &&
    originalCheckData.time >= 1 &&
    originalCheckData.time <= 5
      ? originalCheckData.time
      : false;

  originalCheckData.state =
    typeof originalCheckData.state == "string" &&
    ["up", "down"].indexOf(originalCheckData.state) > -1
      ? originalCheckData.state
      : "down";

  originalCheckData.lastChecked =
    typeof originalCheckData.lastChecked == "number" &&
    originalCheckData.lastChecked > 0
      ? originalCheckData.lastChecked
      : false;

  if (
    originalCheckData.id &&
    originalCheckData.userPhone &&
    originalCheckData.protocol &&
    originalCheckData.url &&
    originalCheckData.method &&
    originalCheckData.code &&
    originalCheckData.time
  ) {
    workers.performCheck(originalCheckData);
  } else {
    console.log(
      "Error: one of the checks is not properly formatted. Skipping."
    );
  }
};

workers.performCheck = function (originalCheckData) {
  var checkOutcome = {
    error: false,
    responseCode: false,
  };

  var outcomeSent = false;

  var parsedUrl = url.parse(
    originalCheckData.protocol + "://" + originalCheckData.url,
    true
  );
  var hostName = parsedUrl.hostname;
  var path = parsedUrl.path;

  var requestDetails = {
    protocol: originalCheckData.protocol + ":",
    hostname: hostName,
    method: originalCheckData.method.toUpperCase(),
    path: path,
    timeout: originalCheckData.time * 1000,
  };

  var _moduleToUse = originalCheckData.protocol == "http" ? http : https;
  var req = _moduleToUse.request(requestDetails, function (res) {
    var status = res.statusCode;

    checkOutcome.responseCode = status;
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("error", function (e) {
    checkOutcome.error = { error: true, value: e };
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("timeout", function () {
    checkOutcome.error = { error: true, value: "timeout" };
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.end();
};

workers.processCheckOutcome = function (originalCheckData, checkOutcome) {
  var state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    originalCheckData.code.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";

  var alertWarranted =
    originalCheckData.lastChecked && originalCheckData.state !== state
      ? true
      : false;

  var timeOfCheck = Date.now();
  workers.log(
    originalCheckData,
    checkOutcome,
    state,
    alertWarranted,
    timeOfCheck
  );

  var newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  _data.update("checks", newCheckData.id, newCheckData, function (err) {
    if (!err) {
      if (alertWarranted) {
        workers.alertUserToStatusChange(newCheckData);
      } else {
        console.log("Check outcome has not changed, no alert needed");
      }
    } else {
      console.log("Error trying to save updates to one of the checks");
    }
  });
};

workers.alertUserToStatusChange = function (newCheckData) {
  var msg =
    "Alert: Your check for " +
    newCheckData.method.toUpperCase() +
    " " +
    newCheckData.protocol +
    "://" +
    newCheckData.url +
    " is currently " +
    newCheckData.state;
  sendTwilioSms(newCheckData.userPhone, msg, function (err) {
    if (!err) {
      console.log(
        "Success: User was alerted to a status change in their check, via sms: ",
        msg
      );
    } else {
      console.log(
        "Error: Could not send sms alert to user who had a state change in their check",
        err
      );
    }
  });
};

workers.log = function (
  originalCheckData,
  checkOutcome,
  state,
  alertWarranted,
  timeOfCheck
) {
  const logData = {
    check: originalCheckData,
    outcome: checkOutcome,
    state: state,
    alert: alertWarranted,
    timeOfCheck: timeOfCheck,
  };

  const logString = JSON.stringify(logData);
  const logFileName = originalCheckData.id;

  _logs.append(logFileName, logString, (err) => {
    if (!err) {
      console.log("Logging to file succeded");
    } else {
      console.log("Logging fail");
    }
  });
};

workers.loop = function () {
  setInterval(function () {
    workers.gatherAllChecks();
  }, 1000 * 60);
};

workers.rotateLogs = function () {
  _logs.list(false, function (err, logs) {
    if (!err && logs && logs.length > 0) {
      logs.forEach(function (logName) {
        const logId = logName.replace(".log", "");
        const newFileld = logId + "-" + Date.now();
        _logs.compress(logId, newFileld, function (err) {
          if (!err) {
            _logs.truncate(logId, function (err) {
              if (!err) {
                console.log("success truncating LogFile");
              } else {
                console.log("error truncating LogFile");
              }
            });
          } else {
            console.log("Error compressing one of the log files", err);
          }
        });
      });
    } else {
      console.log("Error: coult not find any logs to ratote");
    }
  });
};

workers.logRotationLoop = function () {
  workers.loop = function () {
    setInterval(function () {
      workers.rotateLogs();
    }, 1000 * 60 * 60 * 24);
  };
};

workers.init = function () {
  workers.gatherAllChecks();

  workers.loop();

  workers.rotateLogs();

  workers.logRotationLoop();
};

module.exports = workers;
