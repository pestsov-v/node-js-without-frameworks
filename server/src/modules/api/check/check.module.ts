import CheckRouter from "./check.router";

import { statusCode } from "../../../core/base/statusCode.enum";
import { IReqData } from "../user/dto/reqData.dto";
import { MISSED_METHOD_MESSAGE } from "../user/user.constants";
import { method } from "../../../core/base/method.enum";

export default function CheckModule (data: IReqData, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    CheckRouter[data.method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};