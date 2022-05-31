const statusCode = require("../../../src/core/base/statusCode");
const CheckService = require("./check.service");
const CheckValidator = require("./check.validator");
const TokenValidator = require("../token/token.validator");

const {
  MISSED_REQUIRE_FIEILDS,
  INCORRECT_PHONE,
  EMPTY_UPDATE_FILEDS,
} = require("./check.exception");

class CheckController {
  postCheck(data, callback) {
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

  getCheck(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE);

    CheckService.readCheck(id, data.headers.token, callback);
  }

  updateCheck(data, callback) {
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

  deleteCheck(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.NOT_FOUND, MISSED_REQUIRE_FIEILDS);

    CheckService.deleteCheck(id, data.headers.token, callback);
  }
}

module.exports = new CheckController();
