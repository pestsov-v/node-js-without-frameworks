import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { strOrBool, strOrUndef } from "./guard/isString.guard";

import { callbackType } from "./type/callback.type";
import { IUserObj } from "./dto/userObj.dto";
import { IUpdateObj } from "./dto/updateObj.dto";


import UserService from "./user.service";
import UserValidator from "./user.validator";
import TokenValidator from "../token/token.validator";
import TokenController from "../token/token.controller";

import { 
  INVALID_USER_PHONE, 
  USER_NOT_AUTH, 
  USER_NOT_FIELDS_TO_UPDATE, 
  MISS_REQUIRED_FIELDS 
} from "./user.exception";
import { IReqData } from "./dto/reqData.dto";

export default class UserController {
  public static createUser(data: IReqData, callback: callbackType) {
    const firstName: strOrBool = UserValidator.nameValidate(data.payload.firstName);
    const lastName: strOrBool = UserValidator.nameValidate(data.payload.lastName);
    const phone: strOrBool = UserValidator.phoneValidate(data.payload.phone);
    const password: strOrBool = UserValidator.passwordValidate(data.payload.password);
    const tosAggrement: boolean = UserValidator.tosAggValidate(
      data.payload.tosAggrement
    );

    if (!firstName || !lastName || !phone || !password || !tosAggrement) {
      callback(statusCode.BAD_REQUEST, MISS_REQUIRED_FIELDS);
    }

    const userObj: IUserObj = { firstName, lastName, phone, password };
    return UserService.writeUser(userObj, callback);
  }

  public static getUser(data: Omit<IReqData, 'payload'>, callback: callbackType) {
    const phone: strOrBool = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);
    const token: string = TokenValidator.tokenValidate(data.headers.token);

    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      UserService.readUser(phone, callback);
    });
  }

  public static updateUser(data: IReqData, callback: callbackType) {
    const phone: strOrBool = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const firstName: strOrUndef = UserValidator.nameUpdateValidate(data.payload.firstName);
    const lastName: strOrUndef = UserValidator.nameUpdateValidate(data.payload.lastName);
    const password: strOrUndef = UserValidator.passwordUpdateValidate(data.payload.password);
    if (!firstName && !lastName && !password) {
      return callback(statusCode.BAD_REQUEST, USER_NOT_FIELDS_TO_UPDATE);
    }

    const token: string = TokenValidator.tokenValidate(data.headers.token);

    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      const updateObj: IUpdateObj = { firstName, lastName, password };

      UserService.updateUser(phone, updateObj, callback);
    });
  }

  public static deleteUser(data: Omit<IReqData, 'payload'>, callback: callbackType) {
    const phone: strOrBool = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token: string = TokenValidator.tokenValidate(data.headers.token);
    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      UserService.deleteUser(phone, callback);
    });
  }
}