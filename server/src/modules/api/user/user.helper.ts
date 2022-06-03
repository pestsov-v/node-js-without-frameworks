import crypto from "crypto";

import { IHashObj } from "./dto/userObject.dto";
import { strOrBool } from "./guard/isString.guard";
import { IHashUserObjectResponse } from "./response/hashUserObject.response";

import config from "../../../../config/variables.config";

export default class UserHelper {
  static hashPassword(password: strOrBool): strOrBool {
    if (typeof password === 'string' && password.length > 0) {
      const hash: string = crypto
        .createHmac("sha256", config.hashingSecret)
        .update(password)
        .digest("hex");
      return hash;
    } else {
      return false;
    }
  }

  static hashUserObject(hashObj: IHashObj): IHashUserObjectResponse {
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