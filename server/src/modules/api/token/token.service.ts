import { router } from "../../../core/base/enum/router.enum";
import { statusCode } from "../../../core/base/enum/statusCode.enum";
import db from "../../../core/database/db.router";
import UserHelper from "../user/user.helper";
import TokenHelper from "./token.helper";

const {
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
} = require("./token.exception");

export default class TokenService {
  static writeToken(phone, password, callback) {
    db.read(router.users, phone, (err, userData) => {
      if (err) {
        return callback(statusCode.BAD_REQUEST, USER_NOT_FOUND_WITH_PHONE);
      }

      const hashPassword = UserHelper.hashPassword(password);
      if (hashPassword != userData.hashPassword)
        return callback(statusCode.BAD_REQUEST, PASSWORD_NOT_MATCHED);

      const tokenId = TokenHelper.createRandomString(20);
      const tokenObject = TokenHelper.createObj(phone, tokenId);

      db.create(router.tokens, tokenId, tokenObject, (err) => {
        if (err) return callback(400, USER_NOT_CREATED);
        return callback(200, tokenObject);
      });
    });
  }

  static readToken(id, callback) {
    db.read(router.tokens, id, (err, tokenData) => {
      if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
      return callback(200, tokenData);
    });
  }

  static updateToken(id, callback) {
    db.read(router.tokens, id, (err, tokenData) => {
      if (err) return callback(statusCode.BAD_REQUEST, TOKEN_NOT_EXISTS);

      const expiredMatch = tokenData.expires < Date.now();
      if (expiredMatch) return callback(statusCode.BAD_REQUEST, TOKEN_HAS_TIED);

      tokenData.expires = Date.now() * 1000 * 60 * 60;

      db.update(router.tokens, id, tokenData, (err) => {
        if (err) return callback(statusCode.SERVER_ERROR, TOKEN_UPDATE_ERROR);
        return callback(statusCode.OK, TOKEN_UPDATE_SUCCESS);
      });
    });
  }

  static deleteToken(id, callback) {
    db.read(router.tokens, id, (err) => {
      if (err) return callback(statusCode.NOT_FOUND, TOKEN_NOT_FOUND);

      db.delete(router.tokens, id, (err) => {
        if (err) return callback(statusCode.BAD_REQUEST, TOKEN_ERROR);
        return callback(statusCode.OK, TOKEN_DELETE_SUCCESS);
      });
    });
  }

  static verifyToken(tokenId, phone, callback) {
    db.read(router.tokens, tokenId, (err, tokenData) => {
      if (err) return callback(false);
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        return callback(true);
      }
      return callback(false);
    });
  }
}