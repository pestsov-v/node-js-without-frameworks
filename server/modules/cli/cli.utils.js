const CLIValidator = require("./cli.validator");
const CLIHelper = require("./cli.helper");
const e = require("./cli.events");

function inputCommandMatched(str) {
  str = CLIValidator.strValidate(str);
  if (!str) console.log("Введена некоректная строка запроса");
  const uniqueInputs = CLIHelper.getCommandsArray();
  let matchFound = false;

  uniqueInputs.some((input) => {
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

module.exports = inputCommandMatched;
