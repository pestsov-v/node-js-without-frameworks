import dns from "dns";
import db from "../../../core/database/db.router";
import config from "../../../../config/variables.config";
import router from "../../../core/base/router.enum";
import statusCode from "../../../core/base/statusCode.enum";

import CheckHelper from "./check.helper";
import CheckValidator from "./check.validator";
import TokenValidator from "../token/token.validator";
import TokenHelper from "../token/token.helper";
import TokenController from "../token/token.controller";

import { strOrBool } from "../../../core/base/union.type";

import { errOrNull } from "../../logger/type/errorOrNull.type";
import { INCORRECT_TOKEN } from "../token/token.exception";
import { IUserDataDto } from "../user/dto/userData.dto";
import { ICheckObject } from "./dto/checkObject.dto";
import { ITokenData } from "./dto/tokenData.dto";
import { ICheckDataDto } from "./dto/checkData.dto";
import { checkCallback } from "./type/postCallback.type";

import {
   USER_NOT_AUTH, 
  GET_MAX_CHECKS, 
  SERVER_CREATE_CHECK, 
  SERVER_UPDATE_CHECK, 
  USER_NOT_AUTH_GET, 
  TOKEN_NOT_FOUND, 
  CHECK_NOT_FOUND, 
  CHECK_NOT_AUTH_UPDATE, 
  SERVER_ERROR_UPDATE, 
  SERVER_UPDATE_SUCCESS, 
  CHECK_NOT_FOUND_ID, 
  CHECK_NOT_AUTH_DELETE, 
  SERVER_ERROR_DELETE, 
  USER_NOT_FOUND, 
  USER_EMPTY_CHECKS, 
  CHECK_DELETE_SUCCESS, 
  INVALID_HOSTNAME 
} from "./check.exception";




export default class CheckService {
  static writeCheck(checkObj: Pick<ICheckDataDto, 'protocol' | 'url' | 'method' | 'code' | 'time'>, token: string, callback: checkCallback) {
    const { protocol, url, method, code, time } = checkObj;

    const validToken: strOrBool = TokenValidator.tokenValidate(token);
    if (typeof validToken === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN)
    db.read(router.tokens, validToken, (err: errOrNull, tokenData: ITokenData) => {
      if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_AUTH);
      const userPhone: string = tokenData.phone;

      db.read(router.users, userPhone, (err: errOrNull, userData: IUserDataDto) => {
        if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_AUTH);
        const userChecks: string | string[] = CheckValidator.userChecks(userData.checks);

        if (userChecks.length > config.maxChecks) {
          return callback(statusCode.BAD_REQUEST, GET_MAX_CHECKS);
        }

        const parsedUrl = CheckHelper.getUrl(protocol, url);
        if (!parsedUrl.hostname) return callback(statusCode.BAD_REQUEST, INVALID_HOSTNAME)
        const hostName: strOrBool = CheckValidator.hostnameValidate(parsedUrl.hostname);
        if (typeof hostName === 'boolean') return callback(statusCode.BAD_REQUEST, INVALID_HOSTNAME)

        dns.resolve(hostName, (err: errOrNull, records) => {
          if (err) return callback(statusCode.BAD_REQUEST, INVALID_HOSTNAME);
          const id: string = TokenHelper.createRandomString(20,callback);
          const obj = { id, userPhone, protocol, url, method, code, time };
          const checkObject: Omit<ICheckDataDto, 'state' | 'lastChecked'> = CheckHelper.checkObj(obj);

          db.create(router.checks, id, checkObject, (err) => {
            if (err) return callback(statusCode.SERVER_ERROR, SERVER_CREATE_CHECK);

            userData.checks = userChecks;
            userData.checks.push(id);

            db.update(router.users, userPhone, userData, (err: errOrNull) => {
              if (err) return callback(statusCode.SERVER_ERROR, SERVER_UPDATE_CHECK);
              return callback(200, checkObject);
            });
          });
        });
      });
    });
  }

  static readCheck(id: string, token: string, callback: checkCallback) {
    db.read(router.checks, id, (err: errOrNull, checkData: ICheckDataDto) => {
      if (err) return callback(statusCode.BAD_REQUEST, TOKEN_NOT_FOUND(id));
      const validToken: strOrBool = TokenValidator.tokenValidate(token);
      if (typeof validToken === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN)
      const phone = checkData.userPhone;

      TokenController.verifyToken(validToken, phone, (validToken: boolean) => {
        if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH_GET);
        return callback(200, checkData);
      });
    });
  }

  static updateCheck(updateObj: Partial<Pick<ICheckDataDto, 'id' | 'method' | 'protocol' | 'url' | 'code' | 'time'>>, token: string, callback: checkCallback) {
    const { id, protocol, url, method, code, time } = updateObj;
    if (typeof id === 'undefined') return callback(statusCode.NOT_FOUND, CHECK_NOT_FOUND_ID)
    db.read(router.checks, id, (err: errOrNull, checkData: ICheckDataDto) => {
      if (err) return callback(statusCode.NOT_FOUND, CHECK_NOT_FOUND);

      const validToken: strOrBool = TokenValidator.tokenValidate(token);
      if (typeof validToken === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN)
      const phone: string = checkData.userPhone;

      TokenController.verifyToken(validToken, phone, (validToken: boolean) => {
        if (!validToken) return callback(statusCode.FORBIDDEN, CHECK_NOT_AUTH_UPDATE);

        if (protocol) checkData.protocol = protocol;
        if (url) checkData.url = url;
        if (method) checkData.method = method;
        if (code) checkData.code = code;
        if (time) checkData.time = time;

        db.update(router.checks, id, checkData, (err: errOrNull) => {
          if (err) {
            return callback(statusCode.SERVER_ERROR, SERVER_ERROR_UPDATE);
          }
          return callback(statusCode.OK, SERVER_UPDATE_SUCCESS);
        });
      });
    });
  }

  static deleteCheck(id: string, token: string, callback: checkCallback) {
    db.read(router.checks, id, (err: errOrNull, checkData: ICheckDataDto) => {
      if (err) return callback(statusCode.NOT_FOUND, CHECK_NOT_FOUND_ID);

      const validToken: strOrBool = TokenValidator.tokenValidate(token);
      if (typeof validToken === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN)
      const phone: string = checkData.userPhone;

      TokenController.verifyToken(validToken, phone, (validToken: boolean) => {
        if (!validToken) return callback(statusCode.FORBIDDEN, CHECK_NOT_AUTH_DELETE);

        db.delete(router.checks, id, (err: errOrNull) => {
          if (err) return callback(statusCode.SERVER_ERROR, SERVER_ERROR_DELETE);
        
          db.read(router.users, phone, (err: errOrNull, userData: IUserDataDto) => {
            if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);

            const userChecks = CheckValidator.userChecks(userData.checks);
            const checkPosition = userChecks.length
            if (userChecks.length < 1) {
              return callback(statusCode.SERVER_ERROR, USER_EMPTY_CHECKS);
            }
            userChecks.splice(checkPosition, 1);
            userData.checks = userChecks;

            db.update(router.users, phone, userData, (err: errOrNull) => {
              if (err) return callback(statusCode.SERVER_ERROR, SERVER_ERROR_UPDATE);
              return callback(statusCode.OK, CHECK_DELETE_SUCCESS);
            });
          });
        });
      });
    });
  }
}