import crypto from "crypto";

import { IUserObject } from "./dto/userObject.dto";
import { IHashUserObjectResponse } from "./response/hashUserObject.response";

import config from "../../../../config/variables.config";
import { statusCode } from "../../../core/base/statusCode.enum";
import { PASSWORD_NOT_MATCHED } from "../token/token.exception";

export default class UserHelper {
  static hashPassword(password: string, callback): string {
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

  static hashUserObject(hashObj: IUserObject): IHashUserObjectResponse {
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