const readLine = require("readline");
const inputCommandMatched = require("./cli.utils");
const colors = require("../../core/color");

function cli() {
  console.log(colors.blue, `Интерфейс командной строки успешно запущен`);

  const _interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  _interface.prompt();
  _interface.on("line", function (str) {
    inputCommandMatched(str);
    _interface.prompt();
  });

  _interface.on("close", function () {
    process.exit(0);
  });
}

module.exports = cli;
