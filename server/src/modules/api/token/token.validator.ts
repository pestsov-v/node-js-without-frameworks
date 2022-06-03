import { strOrBool } from "../../../core/base/union.type";
import { isBoolean, isId, isNumber, isString } from "./guard/base.guard";

export default class TokenValidator {
  static tokenValidate(token: string): strOrBool {
    return isString(token) ? token : false;

  } 

  static numberValidate(length: number): number | false {
    return isNumber(length) ? length : false;
  }

  static idValidate(id: string): strOrBool {
    return isId(id) ? id.trim() : false;
  }

  static extendValidate(extend: boolean): boolean {
    return isBoolean(extend) ? true : false;
  }
}