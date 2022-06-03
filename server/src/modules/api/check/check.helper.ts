import _url from "url";
import { ICheckDataDto } from "./dto/checkData.dto";

export default class CheckHelper {
  static checkObj(obj: Omit<ICheckDataDto, 'state' | 'lastChecked'>): Omit<ICheckDataDto, 'state' | 'lastChecked'> {
    const { id, userPhone, protocol, url, method, code, time } = obj;
    return {
      id: id,
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