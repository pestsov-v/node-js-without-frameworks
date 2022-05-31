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
}

module.exports = new CLIValidator();
