export default class GUIValidator {
  static nameValidate(templateName) {
    return typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;
  }

  static dataValidate(data) {
    return typeof data == "object" && data !== null ? data : {};
  }

  static strValidate(str) {
    return typeof str == "string" && str.length > 0 ? str : "";
  }

  static fileNameValidate(fileName) {
    return typeof fileName == "string" && fileName.length > 0
      ? fileName
      : false;
  }
}