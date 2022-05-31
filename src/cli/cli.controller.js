const CLIGraphic = require("./cli.graphic");
const util = require("util");
const debug = util.debuglog("cli");
const os = require("os");
const v8 = require("v8");
const _data = require("../../core/database/db.router");
const _logs = require("../logs");
const _dataHelper = require("../../core/database/db.helper");
const childProcess = require("child_process");

class CLIController {
  help() {
    var commands = {
      exit: "Выйти из режима консоли и остановить приложение",
      man: "Показать все возможности роботы с консолью",
      help: 'Элиас для комманды "man"',
      stats:
        "Получить статистику по возможностям операционной системы и ресурсам утилизации",
      "List users":
        "Показать список со всеми зарегистрироваными пользоватями в системе",
      "More user info --{userId}":
        "Показать детали по определенному пользователю",
      "List checks --up --down":
        'Показать список всех активных поверок в системе учитывая их состояние"',
      "More check info --{checkId}": "Показать детали по определенному чеку",
      "List logs": "Показать лист всех файлов, которые могут быть прочитаны",
      "More log info --{logFileName}":
        "Показать детали по определенному файлу логгирования",
    };

    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI ОПИСАНИЕ");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(1);

    for (var key in commands) {
      if (commands.hasOwnProperty(key)) {
        var value = commands[key];
        var line = "\x1b[33m " + key + "\x1b[0m";
        var padding = 60 - line.length;

        for (let i = 0; i < padding; i++) {
          line += " ";
        }
        line += value;
        console.log(line);
        CLIGraphic.verticalSpace(1);
      }
    }
    CLIGraphic.verticalSpace(1);

    CLIGraphic.horizontalLine();
  }

  exit() {
    process.exit(0);
  }

  stats() {
    var stats = {
      "Load Average: ": os.loadavg().join(" "),
      "CPU count: ": os.cpus().length,
      "Free memory: ": os.freemem(),
      "Current Malloced Memory: ": v8.getHeapStatistics().malloced_memory,
      "Peak Malloced Memory: ": v8.getHeapStatistics().peak_malloced_memory,
      "Allocated Heap Used (%): ": Math.round(
        (v8.getHeapStatistics().used_heap_size /
          v8.getHeapStatistics().total_heap_size) *
          100
      ),
      "Available Heap Allocated (%): ": Math.round(
        (v8.getHeapStatistics().total_heap_size /
          v8.getHeapStatistics().heap_size_limit) *
          100
      ),
      "Uptime: ": os.uptime() + " Секунд",
    };

    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI Статистика");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(2);

    for (var key in stats) {
      if (stats.hasOwnProperty(key)) {
        var value = stats[key];
        var line = "\x1b[33m " + key + "\x1b[0m";
        var padding = 10 - line.length;
        for (let i = 0; i < padding; i++) {
          line += " ";
        }
        line += value;
        console.log(line);
        CLIGraphic.verticalSpace(1);
      }
    }
    CLIGraphic.verticalSpace(1);

    CLIGraphic.horizontalLine();
  }

  listUsers() {
    _data.list("users", function (err, userIds) {
      if (!err && userIds && userIds.length > 0) {
        CLIGraphic.verticalSpace(1);
        userIds.forEach(function (userId) {
          _data.read("users", userId, function (err, userData) {
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
              CLIGraphic.verticalSpace(1);
            } else {
              console.log(`Пользователя с ID ${userId} не существует`);
              CLIGraphic.verticalSpace(1);
            }
          });
        });
      } else {
        console.log("Список пользователей пуст");
        CLIGraphic.verticalSpace(1);
      }
    });
  }

  listChecks(str) {
    _data.list("checks", function (err, checkIds) {
      if (!err && checkIds) {
        CLIGraphic.verticalSpace(1);
        checkIds.forEach(function (checkId) {
          _data.read("checks", checkId, function (err, checkData) {
            var includeCheck = false;
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
              CLIGraphic.verticalSpace(1);
            }
          });
        });
      } else {
        console.log("Список чеков пуст");
        CLIGraphic.verticalSpace(1);
      }
    });
  }

  moreUserInfo(str) {
    var arr = str.split("--");
    const userId =
      typeof arr[1] == "string" && arr[1].length > 0 ? arr[1].trim() : false;

    if (userId) {
      _data.read("users", userId, function (err, userData) {
        if (!err && userData) {
          delete userData.hashedPassword;

          console.dir(userData, { colors: true });
          CLIGraphic.verticalSpace(1);
        } else {
          console.log("Такого userId не существует");
          CLIGraphic.verticalSpace(1);
        }
      });
    } else {
      console.log("Ведён не коректный userId");
      CLIGraphic.verticalSpace(1);
    }
  }

  listChecks(str) {
    _data.list("checks", function (err, checkIds) {
      if (!err && checkIds) {
        CLIGraphic.verticalSpace(1);
        checkIds.forEach(function (checkId) {
          _data.read("checks", checkId, function (err, checkData) {
            var includeCheck = false;
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
              CLIGraphic.verticalSpace(1);
            }
          });
        });
      } else {
        console.log("Список чеков пуст");
        CLIGraphic.verticalSpace(1);
      }
    });
  }

  moreCheckInfo(str) {
    var arr = str.split("--");
    const checkId =
      typeof arr[1] == "string" && arr[1].length > 0 ? arr[1].trim() : false;

    if (checkId) {
      _data.read("checks", checkId, function (err, checkData) {
        if (!err && checkData) {
          console.dir(checkData, { colors: true });
          CLIGraphic.verticalSpace(1);
        } else {
          console.log("Такого checkId не существует");
          CLIGraphic.verticalSpace(1);
        }
      });
    } else {
      console.log("Ведён не коректный checkId");
      CLIGraphic.verticalSpace(1);
    }
  }

  listLogs() {
    var ls = childProcess.spawn("ls", ["./.logs/"]);
    ls.stdout.on("data", function (dataObj) {
      var dataStr = dataObj.toString();
      var logFileNames = dataStr.split("\n");
      CLIGraphic.verticalSpace(1);
      logFileNames.forEach(function (logFileName) {
        if (
          typeof logFileName == "string" &&
          logFileName.length > 0 &&
          logFileName.indexOf("-") > -1
        ) {
          console.log(logFileName.trim().split(".")[0]);
          CLIGraphic.verticalSpace(1);
        }
      });
    });
  }

  moreLogInfo(str) {
    var arr = str.split("--");
    var logFileName =
      typeof arr[1] == "string" && arr[1].trim().length > 0
        ? arr[1].trim()
        : false;
    if (logFileName) {
      CLIGraphic.verticalSpace(1);
      _logs.decompress(logFileName, function (err, strData) {
        if (!err && strData) {
          var arr = strData.split("\n");
          arr.forEach(function (jsonString) {
            var logObject = _dataHelper.parseObj(jsonString);
            if (logObject && JSON.stringify(logObject) !== "{}") {
              console.dir(logObject, { colors: true });
              CLIGraphic.verticalSpace(1);
            }
          });
        }
      });
    }
  }
}

module.exports = new CLIController();
