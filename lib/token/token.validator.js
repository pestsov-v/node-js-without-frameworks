class TokenValidator {
  tokenValidate(token) {
    return typeof token == "string" ? token : false;
  }
}

module.exports = new TokenValidator();
