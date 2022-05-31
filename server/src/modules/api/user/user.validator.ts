export default class UserValidator {
  nameValidate(name: string) {
    return typeof name == "string" && name.trim().length > 0
      ? name.trim()
      : false;
  }

  passwordValidate(password: string) {
    return typeof password == "string" && password.trim().length > 0
      ? password.trim()
      : false;
  }

  phoneValidate(phone: string) {
    return typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;
  }

  tosAggValidate(tosAggrement: boolean) {
    return typeof tosAggrement == "boolean" && tosAggrement == true
      ? true
      : false;
  }
}

module.exports = new UserValidator();
