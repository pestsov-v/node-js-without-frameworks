import { statusCode } from "../../../core/base/enum/statusCode.enum";

import { callbackType } from "./type/callback.type";
import { IGetUserDto } from "./dto/getUser.dto";
import { ICreateUserDto } from "./dto/createUser.dto";
import { IUpdateUserDto } from "./dto/updateUser.dto";
import { IDeleteUserDto } from "./dto/deleteUser.dto";
import { IUserObj } from "./dto/userObj.dto";
import { IUpdateObj } from "./dto/updateObj.dto";

import { IGetUserResponse } from "./response/getUser.response";
import { ICreateUserResponse } from "./response/createUser.response";
import { IUpdateUserResponse } from "./response/updateUser.response";
import { IDeleteUserResponse } from "./response/deleteUser.response";

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
  createUser(data: ICreateUserDto, callback: callbackType): ICreateUserResponse {
    const firstName: string = UserValidator.nameValidate(data.payload.firstName);
    const lastName: string = UserValidator.nameValidate(data.payload.lastName);
    const phone: string = UserValidator.phoneValidate(data.payload.phone);
    const password: string = UserValidator.passwordValidate(data.payload.password);
    const tosAggrement: boolean = UserValidator.tosAggValidate(
      data.payload.tosAggrement
    );

    if (!firstName || !lastName || !phone || !password || !tosAggrement) {
      callback(statusCode.BAD_REQUEST, MISS_REQUIRED_FIELDS);
    }

    const userObj: IUserObj = { firstName, lastName, phone, password };
    return UserService.writeUser(userObj, callback);
  }

  getUser(data: IGetUserDto, callback: callbackType): IGetUserResponse {
    const phone: string = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);
    const token: string = TokenValidator.tokenValidate(data.headers.token);

    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      UserService.readUser(phone, callback);
    });
  }

  updateUser(data: IUpdateUserDto, callback: callbackType): IUpdateUserResponse {
    const phone: string = UserValidator.phoneValidate(data.payload.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const firstName: string = UserValidator.nameValidate(data.payload.firstName);
    const lastName: string = UserValidator.nameValidate(data.payload.lastName);
    const password: string = UserValidator.passwordValidate(data.payload.password);
    if (!firstName && !lastName && !password) {
      return callback(statusCode.BAD_REQUEST, USER_NOT_FIELDS_TO_UPDATE);
    }

    const token: string = TokenValidator.tokenValidate(data.headers.token);

    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);
      const updateObj: IUpdateObj = { firstName, lastName, password };

      UserService.updateUser(phone, updateObj, callback);
    });
  }

  deleteUser(data: IDeleteUserDto, callback: callbackType): IDeleteUserResponse {
    const phone: string = UserValidator.phoneValidate(data.queryStringObject.phone);
    if (!phone) return callback(statusCode.BAD_REQUEST, INVALID_USER_PHONE);

    const token: string = TokenValidator.tokenValidate(data.headers.token);
    return TokenController.verifyToken(token, phone, (validToken: boolean) => {
      if (!validToken) return callback(statusCode.FORBIDDEN, USER_NOT_AUTH);

      UserService.deleteUser(phone, callback);
    });
  }
}

module.exports = new UserController();
