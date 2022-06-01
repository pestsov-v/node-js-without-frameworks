import CLIValidator from "./cli.validator";
import CLIHelper from "./cli.helper";
import { e } from "./cli.events";

export function inputCommandMatched(str: string): void {
  str = CLIValidator.strValidate(str);
  if (!str) console.log("Введена некоректная строка запроса");
  const uniqueInputs = CLIHelper.getCommandsArray();
  let matchFound = false;

  uniqueInputs.some((input: string) => {
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