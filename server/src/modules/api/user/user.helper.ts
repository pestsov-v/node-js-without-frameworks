import crypto from "crypto";

import { IUserObject } from "./dto/userObject.dto";

import config from "../../../../config/variables.config";
import statusCode from "../../../core/base/statusCode.enum";
import { PASSWORD_NOT_MATCHED } from "../token/token.exception";
import { userCallback } from "./type/callback.type";

export default class UserHelper {
  static hashPassword(password: string, callback: userCallback) {
    if (typeof password === 'string' && password.length > 0) {
      const hash: string = crypto
        .createHmac("sha256", config.hashingSecret)
        .update(password)
        .digest("hex");
      return hash;
    } else {
      return callback(statusCode.BAD_REQUEST, PASSWORD_NOT_MATCHED);
    }
  }

  static hashUserObject(hashObj: IUserObject) {
    const { firstName, lastName, phone, hashPassword } = hashObj;
    return {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      hashPassword: hashPassword,
      tosAggrement: true,
    };
  }
}