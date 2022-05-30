const _url = require("url");

class CheckHelper {
  checkObj(obj) {
    const { checkId, userPhone, protocol, url, method, code, time } = obj;
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

  getUrl(protocol, url) {
    return _url.parse(protocol + "://" + url, true);
  }
}

module.exports = new CheckHelper();
