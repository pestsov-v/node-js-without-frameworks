import _url from "url";

export default class CheckHelper {
  static checkObj(obj) {
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

  static getUrl(protocol: string, url: string) {
    return _url.parse(protocol + "://" + url, true);
  }
}