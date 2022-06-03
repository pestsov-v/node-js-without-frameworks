import UserValidator from "../user/user.validator";
import TokenValidator from "./token.validator";
import TokenService from "./token.service";

import statusCode from "../../../core/base/statusCode.enum";
import { strOrBool } from "../../../core/base/union.type";
import { ITokenData } from "./dto/tokenData.dto";
import { tokenCallback } from "./type/tokenCallback.type";

import {
  INCORRECT_PHONE_FIELD, 
  INCORRECT_PASSWORD_FIELD, 
  MISSED_REQUIRED_FIELDS, 
  INCORRECT_TOKEN 
} from "./token.exception";

export default class TokenController {
  static createToken(data: ITokenData, callback: tokenCallback) {
    const phone: strOrBool = UserValidator.phoneValidate(data.payload.phone);
    if (typeof phone === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE_FIELD);

    const password: strOrBool = UserValidator.passwordValidate(data.payload.password);
    if (typeof password === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_PASSWORD_FIELD);

    TokenService.writeToken(phone, password, callback);
  }

  static getToken(data: ITokenData, callback: tokenCallback) {
    const id: strOrBool = TokenValidator.idValidate(data.queryStringObject.id);
    if (typeof id === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.readToken(id, callback);
  }

  static udpateToken(data: ITokenData, callback: tokenCallback) {
    const id: strOrBool = TokenValidator.idValidate(data.payload.id);
    const extend: boolean = TokenValidator.extendValidate(data.payload.extend);

    if (typeof id === 'boolean' || extend === false) return callback(statusCode.BAD_REQUEST, MISSED_REQUIRED_FIELDS);

    TokenService.updateToken(id, callback);
  }

  static deleteToken(data: ITokenData, callback: tokenCallback) {
    const id: strOrBool = TokenValidator.idValidate(data.queryStringObject.id);
    if (typeof id === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.deleteToken(id, callback);
  }

  static verifyToken(tokenId: string, phone: string, callback: tokenCallback) {
    TokenService.verifyToken(tokenId, phone, callback);
  }
}
