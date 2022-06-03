import { statusCode } from "../../../core/base/enum/statusCode.enum";

const CheckService = require("./check.service");
import CheckValidator from "./check.validator";
const TokenValidator = require("../token/token.validator");

const {
  MISSED_REQUIRE_FIEILDS,
  INCORRECT_PHONE,
  EMPTY_UPDATE_FILEDS,
} = require("./check.exception");

export default class CheckController {
  static postCheck(data, callback) {
    console.log(data)
    const protocol = CheckValidator.protocolValidate(data.payload.protocol);
    const url = CheckValidator.urlValidate(data.payload.url);
    const method = CheckValidator.methodValidate(data.payload.method);
    const code = CheckValidator.codeValidate(data.payload.code);
    const time = CheckValidator.timeValidate(data.payload.time);

    if (!protocol || !url || !method || !code || !time) {
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRE_FIEILDS);
    }

    const checkObj = { protocol, url, method, code, time };
    CheckService.writeCheck(checkObj, data.headers.token, callback);
  }

  static getCheck(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE);

    CheckService.readCheck(id, data.headers.token, callback);
  }

  static updateCheck(data, callback) {
    const id = TokenValidator.idValidate(data.payload.id);
    if (!id) return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    const protocol = CheckValidator.protocolValidate(data.payload.protocol);
    const url = CheckValidator.urlValidate(data.payload.url);
    const method = CheckValidator.methodValidate(data.payload.method);
    const code = CheckValidator.codeValidate(data.payload.code);
    const time = CheckValidator.timeValidate(data.payload.time);

    if (!protocol && !url && !method && !code && !time) {
      return callback(statusCode.BAD_REQUEST, EMPTY_UPDATE_FILEDS);
    }

    const updateObj = { id, protocol, url, method, code, time };
    CheckService.updateCheck(updateObj, data.headers.token, callback);
  }

  static deleteCheck(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    CheckService.deleteCheck(id, data.headers.token, callback);
  }
}