import CheckService from "./check.service";
import CheckValidator from "./check.validator";
import TokenValidator from "../token/token.validator";

import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { ICheckData } from "./dto/reqData.dto";
import { strOrBool } from "./type/union.type";

import {
  MISSED_REQUIRE_FIEILDS, 
  INCORRECT_PHONE, 
  EMPTY_UPDATE_FILEDS 
} from "./check.exception";
import { ICheckObject } from "./dto/checkObject.dto";

export default class CheckController {
  static postCheck(data: ICheckData, callback) {
    const protocol = CheckValidator.protocolValidate(data.payload.protocol);
    const url = CheckValidator.urlValidate(data.payload.url);
    const method = CheckValidator.methodValidate(data.payload.method);
    const code = CheckValidator.codeValidate(data.payload.code);
    const time = CheckValidator.timeValidate(data.payload.time);

    if (typeof protocol === 'boolean' || typeof url === 'boolean' || typeof method === 'boolean' || typeof code === 'boolean' || typeof time === 'boolean') {
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRE_FIEILDS);
    }

    const checkObj: ICheckObject = { protocol, url, method, code, time };
    CheckService.writeCheck(checkObj, data.headers.token, callback);
  }

  static getCheck(data: ICheckData, callback) {
    const id: strOrBool = TokenValidator.idValidate(data.queryStringObject.id);
    if (typeof id === 'boolean') return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE);

    CheckService.readCheck(id, data.headers.token, callback);
  }

  static updateCheck(data: ICheckData, callback) {
    const id = TokenValidator.idValidate(data.payload.id);
    if (typeof id === 'boolean') return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    const protocol = CheckValidator.protocolValidate(data.payload.protocol);
    const url = CheckValidator.urlValidate(data.payload.url);
    const method = CheckValidator.methodValidate(data.payload.method);
    const code = CheckValidator.codeValidate(data.payload.code);
    const time = CheckValidator.timeValidate(data.payload.time);

    if (typeof protocol == 'boolean' || typeof url == 'boolean' || typeof method == 'boolean' || typeof code == 'boolean' || typeof time == 'boolean') {
      return callback(statusCode.BAD_REQUEST, EMPTY_UPDATE_FILEDS);
    }

    const updateObj = { id, protocol, url, method, code, time };
    CheckService.updateCheck(updateObj, data.headers.token, callback);
  }

  static deleteCheck(data: ICheckData, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    CheckService.deleteCheck(id, data.headers.token, callback);
  }
}