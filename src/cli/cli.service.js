const db = require("../../core/database/db.router");
const CLIGraphic = require("./cli.graphic");
const childProcess = require("child_process");

class CLIService {
  getListUser() {
    db.list("users", function (err, userIds) {
      if (!err && userIds && userIds.length > 0) {
        CLIGraphic.verticalSpace(1);
        userIds.forEach(function (userId) {
          db.read("users", userId, function (err, userData) {
            if (!err && userData) {
              let line =
                "Name: " +
                userData.firstName +
                " " +
                userData.lastName +
                " Phone: " +
                userData.phone +
                " Чеков: ";
              let numberOfChecks =
                typeof userData.checks == "object" &&
                userData.checks instanceof Array &&
                userData.checks.length > 0
                  ? userData.checks.length
                  : 0;
              line += numberOfChecks;
              console.log(line);
            } else {
              console.log(`Пользователя с ID ${userId} не существует`);
            }
          });
        });
      } else {
        console.log("Список пользователей пуст");
      }
    });
  }

  getListCheck(str) {
    db.list("checks", function (err, checkIds) {
      if (!err && checkIds) {
        CLIGraphic.verticalSpace(1);
        checkIds.forEach(function (checkId) {
          db.read("checks", checkId, function (err, checkData) {
            var loverString = str.toLowerCase();
            var state =
              typeof checkData.state == "string" ? checkData.state : "down";
            var stateOrUnknown =
              typeof checkData.state == "string" ? checkData.state : "unknown";

            if (
              loverString.indexOf("--" + state) > -1 ||
              (loverString.indexOf("--down") == -1 &&
                loverString.indexOf("--up") == -1)
            ) {
              const line =
                "Id: " +
                checkData.id +
                " " +
                checkData.method.toUpperCase() +
                " " +
                checkData.protocol +
                "://" +
                " State: " +
                stateOrUnknown;
              console.log(line);
            }
          });
        });
      } else {
        console.log("Список чеков пуст");
      }
    });
  }

  getListLogs() {
    var ls = childProcess.spawn("ls", ["./.logs/"]);
    ls.stdout.on("data", function (dataObj) {
      var dataStr = dataObj.toString();
      var logFileNames = dataStr.split("\n");
      logFileNames.forEach(function (logFileName) {
        if (
          typeof logFileName == "string" &&
          logFileName.length > 0 &&
          logFileName.indexOf("-") > -1
        ) {
          console.log(logFileName.trim().split(".")[0]);
        }
      });
    });
  }

  readUser(userId) {
    db.read("users", userId, function (err, userData) {
      if (err) console.log("Такого userId не существует");
      delete userData.hashedPassword;
      console.dir(userData, { colors: true });
    });
  }

  readCheck(checkId) {
    db.read("checks", checkId, function (err, checkData) {
      if (err) console.log("Такого checkId не существует");
      console.dir(checkData, { colors: true });
      CLIGraphic.verticalSpace(1);
    });
  }
}

module.exports = new CLIService();
