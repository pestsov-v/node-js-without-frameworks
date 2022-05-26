const db = require("../../../core/database/db.router");
const statusCode = require("../../../core/base/statusCode");
const router = require("../../../core/base/enum/route.enum");
const UserHelper = require("./user.helper");
const UserValidator = require("./user.validator");
const TokenValidator = require("../token/token.validator");
const CheckValidator = require("../check/check.validator");
const TokenController = require("../token/token.controller");
const {
  USER_WAS_CREATED,
  USER_SUCCESS_CREATE,
  USER_HAS_BEEN_CREATED,
  INVALID_USER_PHONE,
  USER_NOT_CREATED,
  USER_NOT_AUTH,
  USER_NOT_FOUND,
  USER_NOT_FIELDS_TO_UPDATE,
  USER_CAN_NOT_UPDATE,
  USER_SUCCESS_UPDATE,
  MISS_REQUIRED_FIELDS,
  USER_PHONE_NOT_FOUND,
  USER_NOT_EXISTS,
  USER_SUCCESS_DELETE,
  USER_CAN_NOT_DELETE,
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

    db.read(router.users, phone, (err, data) => {
      if (!err) return callback(statusCode.BAD_REQUEST, USER_HAS_BEEN_CREATED);
      const hashPassword = UserHelper.hashPassword(password);
      if (!hashPassword)
        return callback(statusCode.BAD_REQUEST, USER_WAS_CREATED);

      const userObject = UserHelper.hashUserObject(
        firstName,
        lastName,
        phone,
        hashPassword
      );

      db.create(router.users, phone, userObject, (err) => {
        if (err) return callback(statusCode.SERVER_ERROR, USER_NOT_CREATED);
        return callback(statusCode.OK, USER_SUCCESS_CREATE(phone));
      });
    });
  }

  getUser(data, callback) {
    const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token = TokenValidator.tokenValidate(data.headers.token);

    TokenController.verifyToken(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      db.read(router.users, phone, (err, data) => {
        if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
        delete data.hashPassword;
        callback(statusCode.OK, data);
      });
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

    TokenController.verifyToke(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      db.read(router.users, phone, (err, userData) => {
        if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_EXISTS);

        if (firstName) userData.firstName = firstName;
        if (lastName) userData.lastName = lastName;
        if (password) userData.hashPassword = UserHelper.hashPassword(password);

        db.update(router.users, phone, userData, (err) => {
          if (err)
            return callback(statusCode.SERVER_ERROR, USER_CAN_NOT_UPDATE);
          callback(statusCode.OK, USER_SUCCESS_UPDATE);
        });
      });
    });
  }

  deleteUser(data, callback) {
    const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token = TokenValidator.tokenValidate(data.headers.token);
    TokenController.verifyToke(token, phone, (validToken) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      db.read(router.users, phone, (err, userData) => {
        if (err) return callback(statusCode.BAD_REQUEST, USER_PHONE_NOT_FOUND);

        db.delete(router.users, phone, (err) => {
          if (err) return callback(statusCode.NOT_FOUND, USER_NOT_EXISTS);
          let userChecks = CheckValidator.userChecks(userData.checks);

          if (userChecks.length < 0)
            return callback(statusCode.OK, USER_SUCCESS_DELETE);

          let checksDeleted = 0;
          let deletionErrors = false;

          userChecks.forEach((checkId) => {
            db.delete(router.checks, checkId, (err) => {
              if (!err) deletionErrors = true;
              checksDeleted++;

              if (checksDeleted == checksToDelete) {
                if (deletionErrors)
                  return callback(statusCode.SERVER_ERROR, USER_CAN_NOT_DELETE);
              }
            });
          });

          return callback(statusCode.OK, USER_SUCCESS_DELETE);
        });
      });
    });
  }
}

module.exports = new UserController();
