const readLine = require("readline");
const events = require("events");
const util = require("util");
const debug = util.debuglog("cli");

class _events extends events {}
const e = new _events();

let cli = {};

e.on("man", function () {
  cli.responders.help();
});

cli.responders.help = function () {
  // Codify the commands and their explanations
  var commands = {
    exit: "Kill the CLI (and the rest of the application)",
    man: "Show this help page",
    help: 'Alias of the "man" command',
    stats:
      "Get statistics on the underlying operating system and resource utilization",
    "List users":
      "Show a list of all the registered (undeleted) users in the system",
    "More user info --{userId}": "Show details of a specified user",
    "List checks --up --down":
      'Show a list of all the active checks in the system, including their state. The "--up" and "--down flags are both optional."',
    "More check info --{checkId}": "Show details of a specified check",
    "List logs":
      "Show a list of all the log files available to be read (compressed and uncompressed)",
    "More log info --{logFileName}": "Show details of a specified log file",
  };

  // Show a header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered("CLI MANUAL");
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = "      \x1b[33m " + key + "      \x1b[0m";
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

  // End with another horizontal line
  cli.horizontalLine();
};

// Create a vertical space
cli.verticalSpace = function (lines) {
  lines = typeof lines == "number" && lines > 0 ? lines : 1;
  for (i = 0; i < lines; i++) {
    console.log("");
  }
};

// Create a horizontal line across the screen
cli.horizontalLine = function () {
  // Get the available screen size
  var width = process.stdout.columns;

  // Put in enough dashes to go across the screen
  var line = "";
  for (i = 0; i < width; i++) {
    line += "-";
  }
  console.log(line);
};

// Create centered text on the screen
cli.centered = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : "";

  // Get the available screen size
  var width = process.stdout.columns;

  // Calculate the left padding there should be
  var leftPadding = Math.floor((width - str.length) / 2);

  // Put in left padded spaces before the string itself
  var line = "";
  for (i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;
  console.log(line);
};

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
  process.exit(0);
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
