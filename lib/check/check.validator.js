class CheckValidator {
  userChecks(checks) {
    return typeof checks == "object" && checks instanceof Array ? checks : [];
  }
}

module.exports = new CheckValidator();
