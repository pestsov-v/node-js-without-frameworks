const https = require("https");
const http = require("http");

class WorkerValidator {
  objValidate(originalCheckData) {
    return typeof originalCheckData == "object" && originalCheckData !== null
      ? originalCheckData
      : {};
  }

  idValidate(id) {
    return typeof id == "string" && id.trim().length == 20 ? id.trim() : false;
  }

  phoneValidate(phone) {
    return typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;
  }

  protocolValidate(protocol) {
    return typeof protocol == "string" &&
      ["http", "https"].indexOf(protocol) > -1
      ? protocol
      : false;
  }

  urlValidate(url) {
    return typeof url == "string" && url.trim().length > 0 ? url.trim() : false;
  }

  methodValidate(method) {
    return typeof method == "string" &&
      ["post", "get", "put", "delete"].indexOf(method) > -1
      ? method
      : false;
  }

  сodeValidate(code) {
    return typeof code == "object" && code instanceof Array && code.length > 0
      ? code
      : false;
  }

  timeValidate(time) {
    return typeof time == "number" && time % 1 === 0 && time >= 1 && time <= 5
      ? time
      : false;
  }

  stateValidate(state) {
    return typeof state == "string" && ["up", "down"].indexOf(state) > -1
      ? state
      : "down";
  }

  lastValidate(lastChecked) {
    return typeof lastChecked == "number" && lastChecked > 0
      ? lastChecked
      : false;
  }

  useModuleValidate(protocol) {
    return protocol == "http" ? http : https;
  }

  outcomeStateValidate(checkOutcome, code) {
    return !checkOutcome.error &&
      checkOutcome.responseCode &&
      code.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";
  }

  alertValidate(originalCheckData, state) {
    return originalCheckData.lastChecked && originalCheckData.state !== state
      ? true
      : false;
  }
}

module.exports = new WorkerValidator();
