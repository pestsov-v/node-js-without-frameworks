class TokenValidator {
  tokenValidate(token) {
    return typeof token == "string" ? token : false;

  }

  stringValidate(str) {
    return typeof str === "number" && str > 0 ? str : false;
  }

  idValidate(id) {
    return typeof id == "string" && id.trim().length == 20 ? id.trim() : false;
  }

  extendValidate(extend) {
    return typeof extend == "boolean" && extend == true ? true : false;
  }
}

module.exports = new TokenValidator();
