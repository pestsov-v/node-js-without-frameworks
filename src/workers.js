const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");
// const _data = require("./data");

const workers = {};

workers.gatherAllChecks = function () {
  _data.list("checks", function (err, checks) {
    if (!err && checks.length > 0) {
      checks.forEach(function (check) {
        _data.read("checks", check, function (err, originalCheckData) {
          if (!err && originalCheckData) {
            workers.validateCheckData(originalCheckData);
          } else {
            console.log("Error: Произошла ошибка при чтении файла");
          }
        });
      });
    } else {
      console.log("Error: Не найдена ни одна проверка");
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

  originalCheckData.successCodes =
    typeof originalCheckData.successCodes == "object" &&
    originalCheckData.successCodes instanceof Array &&
    originalCheckData.successCodes.length > 0
      ? originalCheckData.successCodes
      : false;

  originalCheckData.timeoutSeconds =
    typeof originalCheckData.timeoutSeconds == "number" &&
    originalCheckData.timeoutSeconds % 1 === 0 &&
    originalCheckData.timeoutSeconds >= 1 &&
    originalCheckData.timeoutSeconds <= 5
      ? originalCheckData.timeoutSeconds
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
    originalCheckData.successCodes &&
    originalCheckData.timeoutSeconds
  ) {
    workers.performCheck(originalCheckData);
  } else {
    console.log("Error: Одна из проверок не соответствует нужному формату.");
  }
};

workers.performCheck = function (originalCheckData) {
  const checkOutcome = {
    error: false,
    responseCode: false,
  };

  const outcomeSent = false;

  const parsedUrl = url.parse(
    `${originalCheckData.protocol}://${originalCheckData.url}`,
    true
  );
  const hostName = parsedUrl.hostname;
  const path = parsedUrl.path;

  const requestDetails = {
    protocol: `${originalCheckData.protocol}:`,
    hostName: hostName,
    method: originalCheckData.method.toUpperCase(),
    path: path,
    timeout: originalCheckData.timeoutSeconds * 1000,
  };

  const _moduleToUse = originalCheckData.protocol == "http" ? http : https;
  const req = _moduleToUse.request(requestDetails, function (res) {
    const status = res.statusCode;
    checkOutcome.responseCode = status;

    if (!outcomeSent) {
      workers.procesCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("error", function (e) {
    checkOutcome.error = {
      err: true,
      value: e,
    };

    if (!outcomeSent) {
      workers.procesCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("timeout", function (e) {
    checkOutcome.error = {
      err: true,
      value: "timeout",
    };

    if (!outcomeSent) {
      workers.procesCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.end();
};

workers.procesCheckOutcome = function (originalCheckData, checkOutcome) {
  const state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";

  const alertWanted =
    originalCheckData.lastChecked && originalCheckData.state != state
      ? true
      : false;

  const newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  _data.update("checks", newCheckData.id, newCheckData, function (err) {
    if (!err) {
      if (alertWanted) {
        workers.alertUserToStatusChange(newCheckData);
      } else {
        console.log("Проверки не обновлени, поэтому нет смысла в выводе");
      }
    } else {
      console.log("Произошла ошибка при обновлении проверок");
    }
  });
};

workers.alertUserToStatusChange = function (newCheckData) {
  const msg = `Объявление: Ваша проверка для ${newCheckData.method.toUpperCase()} ${
    newCheckData.protocol
  }://${newCheckData.url} с текущим статусом: ${newCheckData.state}`;
  helpers.sendTwilioSms(newCheckData.userPhone, msg, function (err) {
    if (!err) {
      console.log("Пользователь успешно получил смс: ", msg);
    } else {
      console.log("Пользователь вместо смс получил ошибку: ", err);
    }
  });
};

workers.loop = function () {
  setInterval(function () {
    workers.gatherAllChecks();
  }, 1000 * 60);
};

workers.init = function () {
  workers.gatherAllChecks();
  workers.loop();
};

module.exports = workers;
