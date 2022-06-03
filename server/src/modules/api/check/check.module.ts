import CheckRouter from "./check.router";

import statusCode from "../../../core/base/statusCode.enum";
import { MISSED_METHOD_MESSAGE } from "../user/user.constants";
import method from "../../../core/base/method.enum";
import { ICheckData } from "./dto/reqData.dto";
import { checkCallback } from "./type/postCallback.type";

export default function CheckModule (data: ICheckData, callback: checkCallback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    CheckRouter[data.method as keyof typeof method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};