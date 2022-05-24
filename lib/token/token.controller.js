const db = require("../../core/database/db.router");
const statusCode = require("../../core/base/statusCode");
const UserHelper = require("../user/user.helper");
const UserValidator = require("../user/user.validator");
const TokenHelper = require("./token.helper");
const TokenValidator = require("./token.validator");

const {
  INCORRECT_PHONE_FIELD,
  INCORRECT_PASSWORD_FIELD,
  USER_NOT_FOUND_WITH_PHONE,
  PASSWORD_NOT_MATCHED,
  USER_NOT_CREATED,
  USER_NOT_FOUND,
  TOKEN_NOT_EXISTS,
  TOKEN_HAS_TIED,
  TOKEN_UPDATE_ERROR,
  TOKEN_UPDATE_SUCCESS,
  TOKEN_NOT_FOUND,
  TOKEN_ERROR,
  TOKEN_DELETE_SUCCESS,
  MISSED_REQUIRED_FIELDS,
  INCORRECT_TOKEN,
} = require("./token.exception");

class TokenController {
  createToken(data, callback) {
    const phone = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INCORRECT_PHONE_FIELD);

    const password = UserValidator.passwordValidate(data.payload.password);
    if (!password)
      return callback(statusCode.BAD_REQUEST, INCORRECT_PASSWORD_FIELD);

    db.read("users", phone, function (err, userData) {
      if (err)
        return callback(statusCode.BAD_REQUEST, USER_NOT_FOUND_WITH_PHONE);

      const hashPassword = UserHelper.hashPassword(password);
      if (hashPassword != userData.hashPassword)
        return callback(statusCode.BAD_REQUEST, PASSWORD_NOT_MATCHED);

      const tokenId = TokenHelper.createRandomString(20);
      console.log(tokenId);
      const tokenObject = TokenHelper.createObj(phone, tokenId);

      db.create("tokens", tokenId, tokenObject, function (err) {
        if (err) return callback(400, USER_NOT_CREATED);
        return callback(200, tokenObject);
      });
    });
  }

  getToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    db.read("tokens", id, function (err, tokenData) {
      if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
      return callback(200, tokenData);
    });
  }

  udpateToken(data, callback) {
    console.log(data);
    const id = TokenValidator.idValidate(data.payload.id);
    const extend = TokenValidator.extendValidate(data.payload.extend);

    if (!id || !extend)
      return callback(statusCode.BAD_REQUEST, MISSED_REQUIRED_FIELDS);

    db.read("tokens", id, (err, tokenData) => {
      if (err) return callback(statusCode.BAD_REQUEST, TOKEN_NOT_EXISTS);

      const expiredMatch = tokenData.expires < Date.now();
      if (expiredMatch) return callback(statusCode.BAD_REQUEST, TOKEN_HAS_TIED);

      tokenData.expires = Date.now() * 1000 * 60 * 60;

      db.update("tokens", id, tokenData, function (err) {
        if (err) return callback(statusCode.SERVER_ERROR, TOKEN_UPDATE_ERROR);
        return callback(statusCode.OK, TOKEN_UPDATE_SUCCESS);
      });
    });
  }

  deleteToken(data, callback) {
    const id = TokenValidator.idValidate(data.queryStringObject.id);
    if (!id) return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);

    db.read("tokens", id, function (err) {
      if (err) return callback(statusCode.NOT_FOUND, TOKEN_NOT_FOUND);

      db.delete("tokens", id, function (err) {
        if (err) return callback(statusCode.BAD_REQUEST, TOKEN_ERROR);
        return callback(statusCode.OK, TOKEN_DELETE_SUCCESS);
      });
    });
  }

  verifyToken(tokenId, phone, callback) {
    db.read("tokens", tokenId, function (err, tokenData) {
      if (err) callback(false);

      const match = tokenData.phone == phone && tokenData.expires > Date.now();
      if (match) return true;
      return callback(false);
    });
  }
}

module.exports = new TokenController();
