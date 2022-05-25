class CheckHelper {
  checkObj(checkId, userPhone, protocol, url, method, code, time) {
    return {
      id: checkId,
      userPhone: userPhone,
      protocol: protocol,
      url: url,
      method: method,
      code: code,
      time: time,
    };
  }
}

module.exports = new CheckHelper();
