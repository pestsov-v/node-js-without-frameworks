const e = require("./cli.events");
const readLine = require("readline");
const commands = require("./cli.commands");

let cli = {};

cli.processInput = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : false;
  if (str) {
    const uniqueInputs = [
      commands.man,
      commands.help,
      commands.exit,
      commands.stats,
      commands.listUsers,
      commands.moreUserInfo,
      commands.listChecks,
      commands.moreCheckInfo,
      commands.listLogs,
      commands.moreLogInfo,
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
