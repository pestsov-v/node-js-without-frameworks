const db = require("../../../src/core/database/db.router");
const statusCode = require("../../../src/core/base/statusCode");
const router = require("../../../src/core/base/enum/route.enum");
const UserHelper = require("./user.helper");
const CheckValidator = require("../check/check.validator");

const {
  USER_WAS_CREATED,
  USER_SUCCESS_CREATE,
  USER_HAS_BEEN_CREATED,
  USER_NOT_CREATED,
  USER_NOT_FOUND,
  USER_CAN_NOT_UPDATE,
  USER_SUCCESS_UPDATE,
  USER_PHONE_NOT_FOUND,
  USER_NOT_EXISTS,
  USER_SUCCESS_DELETE,
  USER_CAN_NOT_DELETE,
} = require("./user.exception");

class UserService {
  writeUser(userObj, callback) {
    const { firstName, lastName, phone, password } = userObj;

    db.read(router.users, phone, (err, data) => {
      if (!err) return callback(statusCode.BAD_REQUEST, USER_HAS_BEEN_CREATED);

      const hashPassword = UserHelper.hashPassword(password);
      if (!hashPassword) {
        return callback(statusCode.BAD_REQUEST, USER_WAS_CREATED);
      }

      const hashObj = { firstName, lastName, phone, hashPassword };
      const userObject = UserHelper.hashUserObject(hashObj);
      this.createUser(phone, userObject, callback);
    });
  }

  createUser(phone, userObject, callback) {
    db.create(router.users, phone, userObject, (err) => {
      if (err) return callback(statusCode.SERVER_ERROR, USER_NOT_CREATED);
      return callback(statusCode.OK, USER_SUCCESS_CREATE(phone));
    });
  }

  readUser(phone, callback) {
    db.read(router.users, phone, (err, data) => {
      if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
      delete data.hashPassword;
      return callback(statusCode.OK, data);
    });
  }

  updateUser(phone, updateObj, callback) {
    db.read(router.users, phone, (err, userData) => {
      if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_EXISTS);
      const { firstName, lastName, password } = updateObj;

      if (firstName) userData.firstName = firstName;
      if (lastName) userData.lastName = lastName;
      if (password) userData.hashPassword = UserHelper.hashPassword(password);

      db.update(router.users, phone, userData, (err) => {
        if (err) return callback(statusCode.SERVER_ERROR, USER_CAN_NOT_UPDATE);
        callback(statusCode.OK, USER_SUCCESS_UPDATE);
      });
    });
  }

  deleteUser(phone, callback) {
    db.read(router.users, phone, (err, userData) => {
      if (err) return callback(statusCode.BAD_REQUEST, USER_PHONE_NOT_FOUND);

      db.delete(router.users, phone, (err) => {
        if (err) return callback(statusCode.NOT_FOUND, USER_NOT_EXISTS);
        let userChecks = CheckValidator.userChecks(userData.checks);
        const checksToDelete = userChecks.length;

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
  }
}

module.exports = new UserService();
