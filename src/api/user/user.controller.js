const statusCode = require("../../../core/base/statusCode");
const UserService = require("./user.service");
const UserValidator = require("./user.validator");
const TokenValidator = require("../token/token.validator");
const TokenController = require("../token/token.controller");
const {
  INVALID_USER_PHONE,
  USER_NOT_AUTH,
  USER_NOT_FIELDS_TO_UPDATE,
  MISS_REQUIRED_FIELDS,
} = require("./user.exception");

class UserController {
  createUser(data, callback) {
    const firstName = UserValidator.nameValidate(data.payload.firstName);
    const lastName = UserValidator.nameValidate(data.payload.lastName);
    const phone = UserValidator.phoneValidate(data.payload.phone);
    const password = UserValidator.passwordValidate(data.payload.password);
    const tosAggrement = UserValidator.tosAggValidate(
      data.payload.tosAggrement
    );

    if (!firstName || !lastName || !phone || !password || !tosAggrement) {
      return callback(statusCode.BAD_REQUEST, MISS_REQUIRED_FIELDS);
    }

    const userObj = { firstName, lastName, phone, password };
    UserService.writeUser(userObj, callback);
  }

  getUser(data, callback) {
    const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token = TokenValidator.tokenValidate(data.headers.token);

    TokenController.verifyToken(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      UserService.readUser(phone, callback);
    });
  }

  updateUser(data, callback) {
    const phone = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const firstName = UserValidator.nameValidate(data.payload.firstName);
    const lastName = UserValidator.nameValidate(data.payload.lastName);
    const password = UserValidator.passwordValidate(data.payload.password);
    if (!firstName && !lastName && !password) {
      return callback(statusCode.BAD_REQUEST, USER_NOT_FIELDS_TO_UPDATE);
    }

    const token = TokenValidator.tokenValidate(data.headers.token);

    TokenController.verifyToken(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      const updateObj = { firstName, lastName, password };

      UserService.updateUser(phone, updateObj, callback);
    });
  }

  deleteUser(data, callback) {
    const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token = TokenValidator.tokenValidate(data.headers.token);
    TokenController.verifyToken(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      UserService.deleteUser(phone, callback);
    });
  }
}

module.exports = new UserController();
