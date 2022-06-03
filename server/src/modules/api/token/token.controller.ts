import UserValidator from "../user/user.validator";
import TokenValidator from "./token.validator";
import TokenService from "./token.service";

import {
  INCORRECT_PHONE_FIELD, 
  INCORRECT_PASSWORD_FIELD, 
  MISSED_REQUIRED_FIELDS, 
  INCORRECT_TOKEN 
} from "./token.exception";
import { statusCode } from "../../../core/base/enum/statusCode.enum";

export default class TokenController {
  static createToken(data, callback) {
    const phone = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE_FIELD);

    const password = UserValidator.passwordValidate(data.payload.password);
    if (!password) {
      return callback(statusCode.BAD_REQUEST, INCORRECT_PASSWORD_FIELD);
    }

    TokenService.writeToken(phone, password, callback);
  }

  static getToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.readToken(id, callback);
  }

  static udpateToken(data, callback) {
    const id = TokenValidator.idValidate(data.payload.id);
    const extend = TokenValidator.extendValidate(data.payload.extend);

    if (!id || !extend)
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRED_FIELDS);

    TokenService.updateToken(id, callback);
  }

  static deleteToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.deleteToken(id, callback);
  }

  static verifyToken(tokenId, phone, callback) {
    TokenService.verifyToken(tokenId, phone, callback);
  }
}
