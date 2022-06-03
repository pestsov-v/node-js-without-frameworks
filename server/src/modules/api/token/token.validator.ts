import { strOrBool } from "../check/type/union.type";
import { isBoolean, isId, isString } from "./guard/base.guard";

export default class TokenValidator {
  static tokenValidate(token: string): strOrBool {
    return isString(token) ? token : false;

  } 

  static stringValidate(str: string): strOrBool {
    return isString(str) ? str : false;
  }

  static idValidate(id: string): strOrBool {
    return isId(id) ? id.trim() : false;
  }

  static extendValidate(extend: boolean): boolean {
    return isBoolean(extend) ? true : false;
  }
}