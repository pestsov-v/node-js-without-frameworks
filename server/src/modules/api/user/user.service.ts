import { router } from "../../../core/base/enum/router.enum";
import { statusCode } from "../../../core/base/enum/statusCode.enum";

import { IReadUserDataDto } from "./dto/readUserData.dto";
import { IWriteUserDataDto } from "./dto/writeUserData.dto";
import { IUpdateUserDataDto } from "./dto/updateUserData.dto";
import { IDeleteUserDataDto } from "./dto/deleteUserData.dto";
import { IUserObj } from "./dto/userObj.dto";
import { IHashObj } from "./dto/hashObj.dto";
import { IUpdateObj } from "./dto/updateObj.dto";

import { strOrBool } from "./guard/isString.guard";

import { IGetUserResponse } from "./response/getUser.response";
import { ICreateUserResponse } from "./response/createUser.response";
import { IDeleteUserResponse } from "./response/deleteUser.response";
import { IUpdateUserResponse } from "./response/updateUser.response";
import { IHashUserObjectResponse } from "./response/hashUserObject.response";

import { callbackType } from "./type/callback.type";
import { errType } from "./type/err.type";

import UserHelper from "./user.helper";
const db = require("../../../core/database/db.router");
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
  USER_GET_SUCCESS
} = require("./user.exception");

export default class UserService {
  
  public static writeUser(userObj: IUserObj, callback: callbackType): ICreateUserResponse {
    const { firstName, lastName, phone, password } = userObj;

    return db.read(router.users, phone, (err: errType, data: IWriteUserDataDto) => {
      if (!err) return callback(statusCode.BAD_REQUEST, USER_HAS_BEEN_CREATED);

      const hashPassword: strOrBool = UserHelper.hashPassword(password);
      if (!hashPassword) {
        return callback(statusCode.BAD_REQUEST, USER_WAS_CREATED);
      }

      const hashObj: IHashObj = { firstName, lastName, phone, hashPassword };
      const userObject: IHashUserObjectResponse = UserHelper.hashUserObject(hashObj);
      this.createUser(phone, userObject, callback);
    });
  }

  public static createUser(phone: strOrBool, userObject: IHashUserObjectResponse, callback: callbackType): ICreateUserResponse {
    return db.create(router.users, phone, userObject, (err: errType) => {
      if (err) return callback(statusCode.SERVER_ERROR, USER_NOT_CREATED);
      return callback(statusCode.OK, USER_SUCCESS_CREATE(phone));
    });
  }

  public static readUser(phone: strOrBool, callback: callbackType): IGetUserResponse {
    return db.read(router.users, phone, (err: errType, data: IReadUserDataDto) => {
      if (err) return callback(statusCode.NOT_FOUND, USER_NOT_FOUND);
      delete data.hashPassword;
      return callback(statusCode.OK, USER_GET_SUCCESS(data));
    });
  }

  public static updateUser(phone: strOrBool, updateObj: IUpdateObj, callback: callbackType): IUpdateUserResponse {
    return db.read(router.users, phone, (err: errType, userData: IUpdateUserDataDto) => {
      if (err) return callback(statusCode.BAD_REQUEST, USER_NOT_EXISTS);
      const { firstName, lastName, password } = updateObj;

      if (firstName) userData.firstName = firstName;
      if (lastName) userData.lastName = lastName;
      if (password) userData.hashPassword = UserHelper.hashPassword(password);

      db.update(router.users, phone, userData, (err: errType) => {
        if (err) return callback(statusCode.SERVER_ERROR, USER_CAN_NOT_UPDATE);
        callback(statusCode.OK, USER_SUCCESS_UPDATE);
      });
    });
  }

  public static deleteUser(phone: strOrBool, callback: callbackType): IDeleteUserResponse {
    return db.read(router.users, phone, (err:errType, userData: IDeleteUserDataDto) => {
      console.log(userData)
      if (err) return callback(statusCode.BAD_REQUEST, USER_PHONE_NOT_FOUND);

      db.delete(router.users, phone, (err: errType) => {
        if (err) return callback(statusCode.NOT_FOUND, USER_NOT_EXISTS);
        let userChecks = CheckValidator.userChecks(userData.checks);
        const checksToDelete = userChecks.length;

        if (userChecks.length < 0)
          return callback(statusCode.OK, USER_SUCCESS_DELETE);

        let checksDeleted = 0;
        let deletionErrors = false;

        userChecks.forEach((checkId: string) => {
          db.delete(router.checks, checkId, (err: errType) => {
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
