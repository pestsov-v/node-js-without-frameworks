const readLine = require("readline");
const events = require("events");
const util = require("util");
const debug = util.debuglog("cli");
const os = require("os");
const v8 = require("v8");
const _data = require("../core/database/db.router");

class _events extends events {}
const e = new _events();

let cli = {};

e.on("man", function () {
  cli.responders.help();
});

e.on("exit", function (str) {
  cli.responders.exit();
});

e.on("stats", function (str) {
  cli.responders.stats();
});

e.on("list users", function (str) {
  cli.responders.listUsers();
});

e.on("more user info", function (str) {
  cli.responders.moreUserInfo(str);
});

e.on("list checks", function (str) {
  cli.responders.listChecks(str);
});

e.on("more check info", function (str) {
  cli.responders.moreCheckInfo();
});

e.on("list logs", function (str) {
  cli.responders.listLogs();
});

e.on("more log info", function (str) {
  cli.responders.moreLogInfo();
});

cli.responders = {};

cli.responders.help = function () {
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

  cli.horizontalLine();
  cli.centered("CLI ОПИСАНИЕ");
  cli.horizontalLine();
  cli.verticalSpace(2);

  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = "\x1b[33m " + key + "\x1b[0m";
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += " ";
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  cli.verticalSpace(1);

  cli.horizontalLine();
};

cli.verticalSpace = function (lines) {
  lines = typeof lines == "number" && lines > 0 ? lines : 1;
  for (i = 0; i < lines; i++) {
    console.log("");
  }
};

cli.horizontalLine = function () {
  var width = process.stdout.columns;

  var line = "";
  for (i = 0; i < width; i++) {
    line += "-";
  }
  console.log(line);
};

cli.centered = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : "";

  var width = process.stdout.columns;

  var leftPadding = Math.floor((width - str.length) / 2);

  var line = "";
  for (i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;
  console.log(line);
};

cli.responders.exit = function () {
  process.exit(0);
};

cli.responders.stats = function () {
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

  cli.horizontalLine();
  cli.centered("CLI Статистика");
  cli.horizontalLine();
  cli.verticalSpace(2);

  for (var key in stats) {
    if (stats.hasOwnProperty(key)) {
      var value = stats[key];
      var line = "\x1b[33m " + key + "\x1b[0m";
      var padding = 10 - line.length;
      for (i = 0; i < padding; i++) {
        line += " ";
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  cli.verticalSpace(1);

  cli.horizontalLine();
};

cli.responders.listUsers = function () {
  _data.list("users", function (err, userIds) {
    if (!err && userIds && userIds.length > 0) {
      cli.verticalSpace();
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
            cli.verticalSpace();
          } else {
            cli.verticalSpace();
            console.log(`Пользователя с ID ${userId} не существует`);
            cli.verticalSpace();
          }
        });
      });
    } else {
      cli.verticalSpace();
      console.log("Список пользователей пуст");
      cli.verticalSpace();
    }
  });
};

cli.responders.moreUserInfo = function (str) {
  var arr = str.split("--");
  const userId =
    typeof arr[1] == "string" && arr[1].length > 0 ? arr[1].trim() : false;

  if (userId) {
    _data.read("users", userId, function (err, userData) {
      if (!err && userData) {
        delete userData.hashedPassword;

        cli.verticalSpace();
        console.dir(userData, { colors: true });
        cli.verticalSpace();
      } else {
        cli.verticalSpace();
        console.log("Такого userId не существует");
        cli.verticalSpace();
      }
    });
  } else {
    cli.verticalSpace();
    console.log("Ведён не коректный userId");
    cli.verticalSpace();
  }
};

cli.responders.listChecks = function (str) {
  _data.list("checks", function (err, checkIds) {
    if (!err && checkIds) {
      cli.verticalSpace();
      checkIds.forEach(function (checkId) {
        _data.read("checks", checkId, function (err, checkData) {
          var includeCheck = false;
          var loverString = str.toLowerCase();
          var state =
            typeof checkData.state == "string" ? checkData.state : "down";
          var stateOrUnknown =
            typeof checkData.state == "string" ? checkData.state : "unknown";

          if (
            loverString.indexOf("--", state) > -1 ||
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
            cli.verticalSpace();
          }
        });
      });
    } else {
      cli.verticalSpace();
      console.log("Список чеков пуст");
      cli.verticalSpace();
    }
  });
};

cli.responders.moreCheckInfo = function () {
  console.log("Вы спросили про moreCheckInfo");
};

cli.responders.listLogs = function () {
  console.log("Вы спросили про listLogs");
};

cli.responders.moreLogInfo = function () {
  console.log("Вы спросили про moreLogInfo");
};

cli.processInput = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : false;
  if (str) {
    const uniqueInputs = [
      "man",
      "help",
      "exit",
      "stats",
      "list users",
      "more user info",
      "list checks",
      "more check info",
      "list logs",
      "more log info",
    ];

    let matchFound = false;
    const counter = 0;

    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        e.emit(input, str);
        return true;
      }
    });

    if (!matchFound) {
      console.log("Такой команды не существует");
    }
  }
};

cli.init = function () {
  console.log("\x1b[34m%s\x1b[0m", `The CLI is running`);

  const _interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  _interface.prompt();
  _interface.on("line", function (str) {
    cli.processInput(str);
    _interface.prompt();
  });

  _interface.on("close", function () {
    process.exit(0);
  });
};

module.exports = cli;
