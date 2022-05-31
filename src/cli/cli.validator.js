class CLIValidator {
  idValidate(str) {
    const arr = str.split("--");
    const id =
      typeof arr[1] == "string" && arr[1].length > 0 ? arr[1].trim() : false;

    return id;
  }

  linesValidate(lines) {
    return typeof lines == "number" && lines > 0 ? lines : 1;
  }

  strValidate(str) {
    return typeof str == "string" && str.trim().length > 0 ? str.trim() : "";
  }

  fileNameValidate(str) {
    const arr = str.split("--");
    console.log(arr[1]);
    const fileName = arr[1].trim().length > 0 ? arr[1].trim() : false;

    return fileName;
  }

  checksValidate(checks) {
    return typeof checks == "object" &&
      checks instanceof Array &&
      checks.length > 0
      ? checks.length
      : 0;
  }

  stateValidate(state) {
    return typeof state == "string" ? state : "down";
  }

  unknownValidate(state) {
    return typeof state == "string" ? state : "unknown";
  }

  lowerStrValidate(lowerString, state) {
    if (
      lowerString.indexOf("--" + state) > -1 ||
      (lowerString.indexOf("--down") == -1 && lowerString.indexOf("--up") == -1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  logFileValidate(logFileName) {
    if (
      typeof logFileName == "string" &&
      logFileName.length > 0 &&
      logFileName.indexOf("-") > -1
    ) {
      return true;
    } else {
      false;
    }
  }
}

module.exports = new CLIValidator();
