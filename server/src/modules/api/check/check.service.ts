const dns = require("dns");
const config = require("../../../../config/variables.config");
import db from "../../../core/database/db.router";
const statusCode = require("../../../core/base/statusCode");
const router = require("../../../core/base/enum/route.enum");
const CheckHelper = require("./check.helper");
const CheckValidator = require("./check.validator");
const TokenValidator = require("../token/token.validator");
const TokenHelper = require("../token/token.helper");
const TokenController = require("../token/token.controller");

const {
  USER_NOT_AUTH,
  GET_MAX_CHECKS,
  SERVER_CREATE_CHECK,
  SERVER_UPDATE_CHECK,
  USER_NOT_AUTH_GET,
  TOKEN_NOT_FOUND,
  CHECK_NOT_FOUND,
  CHECK_NOT_AUTH_UPDATE,
  SERVER_ERROR_UPDATE,
  SERVER_UPDATE_SUCCESS,
  CHECK_NOT_FOUND_ID,
  CHECK_NOT_AUTH_DELETE,
  SERVER_ERROR_DELETE,
  USER_NOT_FOUND,
  USER_EMPTY_CHECKS,
  CHECK_DELETE_SUCCESS,
  INVALID_HOSTNAME,
} = require("./check.exception");

class CheckService {
  writeCheck(checkObj, token, callback) {
    const { protocol, url, method, code, time } = checkObj;

    const validToken = TokenValidator.tokenValidate(token);
    db.read(router.tokens, validToken, (err, tokenData) => {
      if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_AUTH);
      const userPhone = tokenData.phone;

      db.read(router.users, userPhone, (err, userData) => {
        if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_AUTH);
        const userChecks = CheckValidator.userChecks(userData.checks);

        if (userChecks.length > config.maxChecks) {
          return callback(statusCode.BAD_REQUEST, GET_MAX_CHECKS);
        }

        const parsedUrl = CheckHelper.getUrl(protocol, url);
        const hostName = CheckValidator.hostnameValidate(parsedUrl.hostname);

        dns.resolve(hostName, function (err, records) {
          if (err) return callback(statusCode.BAD_REQUEST, INVALID_HOSTNAME);
          const checkId = TokenHelper.createRandomString(20);
          const obj = { checkId, userPhone, protocol, url, method, code, time };
          const checkObject = CheckHelper.checkObj(obj);

          db.create(router.checks, checkId, checkObject, (err) => {
            if (err) {
              return callback(statusCode.SERVER_ERROR, SERVER_CREATE_CHECK);
            }

            userData.checks = userChecks;
            userData.checks.push(checkId);

            db.update(router.users, userPhone, userData, (err) => {
              if (err) {
                return callback(statusCode.SERVER_ERROR, SERVER_UPDATE_CHECK);
              }

              return callback(200, checkObject);
            });
          });
        });
      });
    });
  }

  readCheck(id, token, callback) {
    db.read(router.checks, id, (err, checkData) => {
      if (err) return callback(statusCode.BAD_REQUEST, TOKEN_NOT_FOUND(id));
      const validToken = TokenValidator.tokenValidate(token);
      const phone = checkData.userPhone;

      TokenController.verifyToken(validToken, phone, (validToken) => {
        if (!validToken) {
          return callback(statusCode.FORBIDDEN, USER_NOT_AUTH_GET);
        }
        return callback(200, checkData);
      });
    });
  }

  updateCheck(updateObj, token, callback) {
    const { id, protocol, url, method, code, time } = updateObj;
    db.read(router.checks, id, (err, checkData) => {
      if (err) return callback(statusCode.NOT_FOUND, CHECK_NOT_FOUND);

      const ValidToken = TokenValidator.tokenValidate(token);
      const phone = checkData.userPhone;

      TokenController.verifyToken(ValidToken, phone, (validToken) => {
        if (!validToken) {
          return callback(statusCode.FORBIDDEN, CHECK_NOT_AUTH_UPDATE);
        }

        if (protocol) checkData.protocol = protocol;
        if (url) checkData.url = url;
        if (method) checkData.method = method;
        if (code) checkData.code = code;
        if (time) checkData.time = time;

        db.update(router.checks, id, checkData, (err) => {
          if (err) {
            return callback(statusCode.SERVER_ERROR, SERVER_ERROR_UPDATE);
          }
          return callback(statusCode.OK, SERVER_UPDATE_SUCCESS);
        });
      });
    });
  }

  deleteCheck(id, token, callback) {
    db.read(router.checks, id, (err, checkData) => {
      if (err) return callback(statusCode.NOT_FOUND, CHECK_NOT_FOUND_ID);

      const validToken = TokenValidator.tokenValidate(token);
      const phone = checkData.userPhone;

      TokenController.verifyToken(validToken, phone, (validToken) => {
        if (!validToken) {
          return callback(statusCode.FORBIDDEN, CHECK_NOT_AUTH_DELETE);
        }

        db.delete(router.checks, id, (err) => {
          if (err) {
            return callback(statusCode.SERVER_ERROR, SERVER_ERROR_DELETE);
          }
          db.read(router.users, phone, (err, userData) => {
            if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);

            const userChecks = CheckValidator.userChecks(userData.checks);
            const checkPosition = userChecks.indexOf(id);

            if (checkPosition < 1) {
              return callback(statusCode.SERVER_ERROR, USER_EMPTY_CHECKS);
            }
            userChecks.splice(checkPosition, 1);
            userData.checks = userChecks;

            db.update(router.users, phone, userData, (err) => {
              if (err) {
                return callback(statusCode.SERVER_ERROR, SERVER_ERROR_UPDATE);
              }
              return callback(statusCode.OK, CHECK_DELETE_SUCCESS);
            });
          });
        });
      });
    });
  }
}

module.exports = new CheckService();
