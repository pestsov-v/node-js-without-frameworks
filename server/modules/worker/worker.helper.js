const url = require("url");
const WorkerDebugger = require("./worker.debug");
const sendSms = require("../../src/utils/sendSms");
const { alertMessage } = require("./worker.constants");

class WorkerHelper {
  url = url;

  parceUrl(protocol, url) {
    const parsedUrl = this.url.parse(protocol + "://" + url, true);
    return parsedUrl;
  }

  getDetails(originalCheckData, parcedUrl) {
    const hostName = parcedUrl.hostname;
    const path = parcedUrl.path;

    const { protocol, method, time } = originalCheckData;

    return {
      protocol: protocol + ":",
      hostname: hostName,
      method: method.toUpperCase(),
      path: path,
      timeout: time * 1000,
    };
  }

  getLogObject(originalCheckData, checkOutcome, processOutcome) {
    const { state, alert, timeOfCheck } = processOutcome;

    const logData = {
      check: originalCheckData,
      outcome: checkOutcome,
      state: state,
      alert: alert,
      timeOfCheck: timeOfCheck,
    };

    return JSON.stringify(logData);
  }

  sendSms(newCheckData) {
    const { method, protocol, url, state } = newCheckData;
    const msg = alertMessage(method, protocol, url, state);

    sendSms(newCheckData.userPhone, msg, (err) => {
      if (err) WorkerDebugger.ERROR_SEND_SMS(err);
      WorkerDebugger.SUCCESS_SEND_SMS(msg);
    });
  }
}

module.exports = new WorkerHelper();
