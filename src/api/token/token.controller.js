const statusCode = require("../../../core/base/statusCode");
const UserValidator = require("../user/user.validator");
const TokenValidator = require("./token.validator");
const TokenService = require("./token.service");

const {
  INCORRECT_PHONE_FIELD,
  INCORRECT_PASSWORD_FIELD,
  MISSED_REQUIRED_FIELDS,
  INCORRECT_TOKEN,
} = require("./token.exception");

class TokenController {
  createToken(data, callback) {
    const phone = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE_FIELD);

    const password = UserValidator.passwordValidate(data.payload.password);
    if (!password) {
      return callback(statusCode.BAD_REQUEST, INCORRECT_PASSWORD_FIELD);
    }

    TokenService.writeToken(phone, password, callback);
  }

  getToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.readToken(id, callback);
  }

  udpateToken(data, callback) {
    const id = TokenValidator.idValidate(data.payload.id);
    const extend = TokenValidator.extendValidate(data.payload.extend);

    if (!id || !extend)
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRED_FIELDS);

    TokenService.updateToken(id, callback);
  }

  deleteToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    TokenService.deleteToken(id, callback);
  }

  verifyToken(tokenId, phone, callback) {
    TokenService.verifyToken(tokenId, phone, callback);
  }
}

module.exports = new TokenController();
