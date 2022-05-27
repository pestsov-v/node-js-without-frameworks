const readLine = require("readline");
const events = require("events");
const util = require("util");
const debug = util.debuglog("cli");

class _events extends events {}
const e = new _events();

let cli = {};

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

    const matchFound = false;
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
