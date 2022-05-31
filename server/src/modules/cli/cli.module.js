const readLine = require("readline");
const inputCommandMatched = require("./cli.utils");

function cli() {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `Интерфейс командной строки успешно запущен`
  );

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
