class GUIValidator {
  nameValidate(templateName) {
    return typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;
  }

  dataValidate(data) {
    return typeof data == "object" && data !== null ? data : {};
  }

  strValidate(str) {
    return typeof str == "string" && str.length > 0 ? str : "";
  }

  fileNameValidate(fileName) {
    return typeof fileName == "string" && fileName.length > 0
      ? fileName
      : false;
  }
}

module.exports = new GUIValidator();
