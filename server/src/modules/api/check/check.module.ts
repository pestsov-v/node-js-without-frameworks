const methods = require("../../../core/base/enum/method.enum");

import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { IReqData } from "../user/dto/reqData.dto";
import { MISSED_METHOD_MESSAGE } from "../user/user.constants";
import CheckRouter from "./check.router";

export default function CheckModule (data: IReqData, callback) {

  console.log(CheckRouter[data.method](data, callback))
  const acceptableMethods = [
    methods.post,
    methods.get,
    methods.put,
    methods.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    CheckRouter[data.method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};