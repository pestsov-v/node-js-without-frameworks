import { isCheks, isCode, isMethod, isProtocol, isString, isTime } from "./guard/object.guard";
import { numOrBool, objOrBool, strOrBool } from "./type/union.type";

export default class CheckValidator {
  static userChecks(checks: object): object {
    return isCheks(checks) ? checks : [];
  }

  static protocolValidate(protocol: string): strOrBool {
    return isProtocol(protocol) ? protocol : false;
  }

  static urlValidate(url: string): strOrBool {
    return isString(url) ? url : false;
  }

  static methodValidate(method: string): strOrBool {
    return isMethod(method) ? method : false;
  }

  static codeValidate(code: object): objOrBool {
    return isCode(code) ? code : false;
  }

  static timeValidate(time: number): numOrBool {
    return isTime(time) ? time : false;
  }

  static hostnameValidate(hostname: string): strOrBool {
    return isString(hostname) ? hostname : false;
  }
}