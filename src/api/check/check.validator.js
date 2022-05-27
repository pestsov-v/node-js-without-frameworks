class CheckValidator {
  userChecks(checks) {
    return typeof checks == "object" && checks instanceof Array ? checks : [];
  }

  protocolValidate(protocol) {
    return typeof protocol == "string" &&
      ["https", "http"].indexOf(protocol) > -1
      ? protocol
      : false;
  }

  urlValidate(url) {
    return typeof url == "string" && url.trim().length > 0 ? url : false;
  }

  methodValidate(method) {
    return typeof method == "string" &&
      ["post", "get", "put", "delete"].indexOf(method) > -1
      ? method
      : false;
  }

  codeValidate(code) {
    return typeof code == "object" && code instanceof Array && code.length > 0
      ? code
      : false;
  }

  timeValidate(time) {
    return typeof time == "number" && time % 1 === 0 && time >= 1 && time <= 5
      ? time
      : false;
  }
}

module.exports = new CheckValidator();
