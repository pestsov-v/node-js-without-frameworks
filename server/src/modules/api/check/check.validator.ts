import method from "../../../core/base/method.enum";

import { 
  isCheks, 
  isCode, 
  isMethod, 
  isProtocol, 
  isString, 
  isTime 
} from "../../../core/base/base.guard";

import { 
  numOrBool, 
  strOrBool 
} from "../../../core/base/union.type";

export default class CheckValidator {
  static userChecks(checks: string[]): string[] | [] {
    return isCheks(checks) ? checks : [];
  }

  static protocolValidate(protocol: string): strOrBool {
    return isProtocol(protocol) ? protocol : false;
  }

  static urlValidate(url: string): strOrBool {
    return isString(url) ? url : false;
  }

  static methodValidate(method: method): method | boolean {
    return isMethod(method) ? method : false;
  }

  static codeValidate(code: number[]): number[] | boolean {
    return isCode(code) ? code : false;
  }

  static timeValidate(time: number): numOrBool {
    return isTime(time) ? time : false;
  }

  static hostnameValidate(hostname: string): strOrBool {
    return isString(hostname) ? hostname : false;
  }
}