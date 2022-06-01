import { isNumber } from "./guard/isNumber.guard";
import { isString, strOrBool } from "./guard/isString.guard";

export default class CLIValidator {
  static idValidate(str: string): strOrBool {
    const arr = str.split("--");
    const id = isString(arr[1]) ? arr[1].trim() : false;

    return id;
  }

  static linesValidate(lines: number): number {
    return isNumber(lines) ? lines : 1;
  }

  static strValidate(str: string): string {
    return isString(str) ? str.trim() : "";
  }

  static fileNameValidate(str: string): strOrBool {
    const arr = str.split("--");
    const fileName = isString(arr[1]) ? arr[1].trim() : false;
    return fileName;
  }

  static checksValidate(checks: string[]) {
    return typeof checks == "object" &&
      checks instanceof Array &&
      checks.length > 0
      ? checks.length
      : 0;
  }

  static stateValidate(state: string): string {
    return isString(state) ? state : "down";
  }

  static unknownValidate(state: string): string {
    return isString(state) ? state : "unknown";
  }

  static lowerStrValidate(lowerString: string, state: string): boolean {
    if (lowerString.indexOf("--" + state) > -1 || (lowerString.indexOf("--down") == -1 && lowerString.indexOf("--up") == -1)) {
      return true;
    } else {
      return false;
    }
  }

  static logFileValidate(logFileName: string): boolean {
    if (isString(logFileName) && logFileName.indexOf("-") > -1) {
      return true;
    } else {
      return false;
    }
  }
}
