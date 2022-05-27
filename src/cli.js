const readLine = require("readline");
const events = require("events");
const util = require("util");
const debug = util.debuglog("cli");

class _events extends events {}
const e = new _events();

let cli = {};

e.on("man", function (str) {
  cli.responders.help();
});

e.on("help", function (str) {
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
  cli.responders.moreUserInfo();
});

e.on("list checks", function (str) {
  cli.responders.listChecks();
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
  console.log("Вы спросили про help");
};

cli.responders.exit = function () {
  console.log("Вы спросили про exit");
};

cli.responders.stats = function () {
  console.log("Вы спросили про stats");
};

cli.responders.listUsers = function () {
  console.log("Вы спросили про listUsers");
};

cli.responders.moreUserInfo = function () {
  console.log("Вы спросили про moreUserInfo");
};

cli.responders.listChecks = function () {
  console.log("Вы спросили про listChecks");
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
