const db = require("../../../core/database/db.router");
const statusCode = require("../../../core/base/statusCode");
const router = require("../../../core/base/enum/route.enum");
const UserHelper = require("../user/user.helper");
const TokenHelper = require("./token.helper");

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

class TokenService {
  writeToken(phone, password, callback) {
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

  readToken(id, callback) {
    db.read(router.tokens, id, (err, tokenData) => {
      if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
      return callback(200, tokenData);
    });
  }

  updateToken(id, callback) {
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

  deleteToken(id, callback) {
    db.read(router.tokens, id, (err) => {
      if (err) return callback(statusCode.NOT_FOUND, TOKEN_NOT_FOUND);

      db.delete(router.tokens, id, (err) => {
        if (err) return callback(statusCode.BAD_REQUEST, TOKEN_ERROR);
        return callback(statusCode.OK, TOKEN_DELETE_SUCCESS);
      });
    });
  }

  verifyToken(tokenId, phone, callback) {
    db.read(router.tokens, tokenId, (err, tokenData) => {
      if (err) return callback(false);
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        return callback(true);
      }
      return callback(false);
    });
  }
}

module.exports = new TokenService();
