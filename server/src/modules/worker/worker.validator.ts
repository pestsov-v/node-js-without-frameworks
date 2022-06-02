import https from "https";
import http from "http";
import { httpType, numOrBool, objOrBool, strOrBool } from "./type/base.type";
import { isCode, isData } from "./guard/object.guard";
import { IOriginalCheckData } from "./dto/originalCheckData.dto";

import { 
  isId, 
  isLastChecked, 
  isMethod, 
  isPhone, 
  isProtocol, 
  isState, 
  isTime, 
  isUrl 
} from "./guard/base.guard";
import { method } from "../../core/base/enum/method.enum";

export  default class WorkerValidator {
  static objValidate(originalCheckData: IOriginalCheckData): IOriginalCheckData {
    return isData(originalCheckData) ? originalCheckData : originalCheckData
  }

  static idValidate(id: string): string {
    return isId(id) ? id.trim() : '';
  }

  static phoneValidate(phone: string): string {
    return isPhone(phone) ? phone.trim(): '';
  }

  static protocolValidate(protocol: string): string {
    return isProtocol(protocol) ? protocol : '';
  }

  static urlValidate(url: string): string {
    return isUrl(url) ? url.trim() : '';
  }

  static methodValidate(method: method): method {
    return isMethod(method) ? method: method;
  }

  static сodeValidate(code: number[]): number[] | number {
    return isCode(code) ? code : 0;
  }

  static timeValidate(time: number | false): number | false {
    return isTime(time) ? time : false;
  }

  static stateValidate(state: string): string {
    return isState(state) ? state : "down";
  }

  static lastValidate(lastChecked: number | false): number | false {
    return isLastChecked(lastChecked) ? lastChecked : false;
  }

  static useModuleValidate(protocol: string): httpType {
    return protocol == "http" ? http : https;
  }

  static outcomeStateValidate(checkOutcome, code) {
    return !checkOutcome.error &&
      checkOutcome.responseCode &&
      code.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";
  }

  static alertValidate(originalCheckData: IOriginalCheckData, state: string): boolean {
    return originalCheckData.lastChecked && originalCheckData.state !== state
      ? true
      : false;
  }
}