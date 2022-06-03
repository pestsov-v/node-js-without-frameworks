import method from "../../../core/base/method.enum";
import statusCode  from "../../../core/base/statusCode.enum";
import { methodOrBool, numOrBool, numsOrBool, strOrBool } from "../../../core/base/union.type";

import CheckService from "./check.service";
import CheckValidator from "./check.validator";
import TokenValidator from "../token/token.validator";

import { ICheckData } from "./dto/reqData.dto";
import { ICheckObject } from "./dto/checkObject.dto";

import {
  MISSED_REQUIRE_FIEILDS, 
  INCORRECT_PHONE, 
  EMPTY_UPDATE_FILEDS 
} from "./check.exception";
import { checkCallback } from "./type/postCallback.type";

export default class CheckController {
  static postCheck(data: ICheckData, callback: checkCallback) {
    const protocol: strOrBool = CheckValidator.protocolValidate(data.payload.protocol);
    const url: strOrBool = CheckValidator.urlValidate(data.payload.url);
    const method: strOrBool = CheckValidator.methodValidate(data.payload.method);
    const code: numsOrBool = CheckValidator.codeValidate(data.payload.code);
    const time: numOrBool = CheckValidator.timeValidate(data.payload.time);

    if (typeof protocol === 'boolean' || typeof url === 'boolean' || typeof method === 'boolean' || typeof code === 'boolean' || typeof time === 'boolean') {
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRE_FIEILDS);
    }

    const checkObj: ICheckObject = { protocol, url, method, code, time };
    return CheckService.writeCheck(checkObj, data.headers.token, callback);
  }

  static getCheck(data: ICheckData, callback: checkCallback) {
    const id: strOrBool = TokenValidator.idValidate(data.queryStringObject.id);
    if (typeof id === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE);

    return CheckService.readCheck(id, data.headers.token, callback);
  }

  static updateCheck(data: ICheckData, callback: checkCallback) {
    const id = TokenValidator.idValidate(data.payload.id);
    if (typeof id === 'boolean') return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    const protocol: strOrBool = CheckValidator.protocolValidate(data.payload.protocol);
    const url: strOrBool = CheckValidator.urlValidate(data.payload.url);
    const method: methodOrBool = CheckValidator.methodValidate(data.payload.method);
    const code: numsOrBool = CheckValidator.codeValidate(data.payload.code);
    const time: numOrBool = CheckValidator.timeValidate(data.payload.time);

    if (typeof protocol == 'boolean' || typeof url == 'boolean' || typeof method == 'boolean' || typeof code == 'boolean' || typeof time == 'boolean') {
      return callback(statusCode.BAD_REQUEST, EMPTY_UPDATE_FILEDS);
    }

    const updateObj = { id, protocol, url, method, code, time };
    return CheckService.updateCheck(updateObj, data.headers.token, callback);
  }

  static deleteCheck(data: ICheckData, callback: checkCallback) {
    const id: strOrBool = TokenValidator.idValidate(data.queryStringObject.id);
    if (typeof id === 'boolean') return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    return CheckService.deleteCheck(id, data.headers.token, callback);
  }
}