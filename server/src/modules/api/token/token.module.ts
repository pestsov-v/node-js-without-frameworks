import method from "../../../core/base/method.enum";
import statusCode from "../../../core/base/statusCode.enum";
import TokenRouter from "./token.router";

import { MISS_REQUIRED_FIELDS } from "../user/user.exception";
import { ITokenData } from "./dto/tokenData.dto";
import { tokenCallback } from "./type/tokenCallback.type";

export default function TokenModule (data: ITokenData, callback: tokenCallback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];

  if (acceptableMethods.indexOf(data.method) > -1) {
    TokenRouter[data.method as keyof typeof method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISS_REQUIRED_FIELDS);
  }
};