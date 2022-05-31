class UserValidator {
  nameValidate(name) {
    return typeof name == "string" && name.trim().length > 0
      ? name.trim()
      : false;
  }

  passwordValidate(password) {
    return typeof password == "string" && password.trim().length > 0
      ? password.trim()
      : false;
  }

  phoneValidate(phone) {
    return typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;
  }

  tosAggValidate(tosAggrement) {
    return typeof tosAggrement == "boolean" && tosAggrement == true
      ? true
      : false;
  }
}

module.exports = new UserValidator();
