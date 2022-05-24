const _data = require("../data");
const UserHelper = require("./user.helper");
const UserValidator = require("./user.validator");
const TokenValidator = require("../token/token.validator");
const CheckValidator = require("../check/check.validator");
const handlers = require("../handlers");
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

const users = {};

users.users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    users._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

users._users = {};

users._users.post = function (data, callback) {
  const firstName = UserValidator.nameValidate(data.payload.firstName);
  const lastName = UserValidator.nameValidate(data.payload.lastName);
  const phone = UserValidator.phoneValidate(data.payload.phone);
  const password = UserValidator.passwordValidate(data.payload.password);
  const tosAggrement = UserValidator.tosAggValidate(data.payload.tosAggrement);

  if (!firstName || !lastName || !phone || !password || !tosAggrement) {
    return callback(400, MISS_REQUIRED_FIELDS);
  }

  _data.read("users", phone, function (err, data) {
    if (!err) return callback(400, USER_HAS_BEEN_CREATED);
    const hashPassword = UserHelper.hashPassword(password);
    if (!hashPassword) return callback(400, USER_WAS_CREATED);

    const userObject = UserHelper.hashUserObject(
      firstName,
      lastName,
      phone,
      hashPassword
    );

    _data.create("users", phone, userObject, function (err) {
      if (err) return callback(500, USER_NOT_CREATED);
      return callback(200, USER_SUCCESS_CREATE(phone));
    });
  });
};

users._users.get = function (data, callback) {
  const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
  if (!phone) return callback(400, INVALID_USER_PHONE);

  const token = TokenValidator.tokenValidate(data.headers.token);

  handlers._tokens.verifyToken(token, phone, function (validToken) {
    if (!validToken) return callback(403, USER_NOT_AUTH);

    _data.read("users", phone, function (err, data) {
      if (err) return callback(404, USER_NOT_FOUND);
      delete data.hashPassword;
      callback(200, data);
    });
  });
};

users._users.put = function (data, callback) {
  const phone = UserValidator.phoneValidate(data.payload.phone);
  if (!phone) return callback(400, INVALID_USER_PHONE);

  const firstName = UserValidator.nameValidate(data.payload.firstName);
  const lastName = UserValidator.nameValidate(data.payload.lastName);
  const password = UserValidator.passwordValidate(data.payload.password);
  if (!firstName && !lastName && !password) {
    return callback(400, USER_NOT_FIELDS_TO_UPDATE);
  }

  const token = TokenValidator.tokenValidate(data.headers.token);

  handlers._tokens.verifyToken(token, phone, function (validToken) {
    if (!validToken) return callback(403, USER_NOT_AUTH);

    _data.read("users", phone, function (err, userData) {
      if (err) return callback(400, USER_NOT_EXISTS);

      if (firstName) userData.firstName = firstName;
      if (lastName) userData.lastName = lastName;
      if (password) userData.hashPassword = UserHelper.hashPassword(password);

      _data.update("users", phone, userData, (err) => {
        if (err) return callback(500, USER_CAN_NOT_UPDATE);
        callback(200, USER_SUCCESS_UPDATE);
      });
    });
  });
};

users._users.delete = function (data, callback) {
  const phone = UserValidator.phoneValidate(data.queryStringObject.phone);
  if (!phone) return callback(400, INVALID_USER_PHONE);

  const token = TokenValidator.tokenValidate(data.headers.token);
  handlers._tokens.verifyToken(token, phone, function (validToken) {
    if (!validToken) return callback(403, USER_NOT_AUTH);

    _data.read("users", phone, function (err, userData) {
      if (err) return callback(400, USER_PHONE_NOT_FOUND);

      _data.delete("users", phone, function (err) {
        if (err) return callback(404, USER_NOT_EXISTS);
        let userChecks = CheckValidator.userChecks(userData.checks);

        if (userChecks.length < 0)
          return callback(200, { message: "Пользователь успешно удалён" });

        let checksDeleted = 0;
        let deletionErrors = false;

        userChecks.forEach(function (checkId) {
          _data.delete("checks", checkId, function (err) {
            if (!err) deletionErrors = true;
            checksDeleted++;

            if (checksDeleted == checksToDelete) {
              if (deletionErrors) return callback(500, USER_CAN_NOT_DELETE);
            }
          });
        });

        return callback(200, USER_SUCCESS_DELETE);
      });
    });
  });
};

module.exports = users;
