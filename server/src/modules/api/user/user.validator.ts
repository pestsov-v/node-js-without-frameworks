import { isStringUndef, strOrBool, strOrUndef } from "./guard/base.guard";


export default class UserValidator {
  public static nameValidate(name: string): strOrBool {
    return typeof name === 'string' ? name.trim() : false
  }

  public static nameUpdateValidate(name: strOrUndef): strOrUndef {
    return isStringUndef(name) ? name.trim() : undefined
  }

  public static passwordValidate(password: string): strOrBool {
    return typeof password === 'string'
      ? password.trim()
      : false;
  }

  public static passwordUpdateValidate(password: strOrUndef): strOrUndef {
    return isStringUndef(password)
      ? password.trim()
      : undefined;
  }

  public static phoneValidate(phone: string): strOrBool {
    return typeof phone === 'string' && phone.trim().length == 10
      ? phone.trim()
      : false;
  }

  public static tosAggValidate(tosAggrement: boolean) {
    return typeof tosAggrement == "boolean" && tosAggrement == true
      ? true
      : false;
  }
}