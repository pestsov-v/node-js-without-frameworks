const methods = require("../../../core/base/enum/methods");
import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { IReqData } from "./dto/reqData.dto";
import { callbackType } from "./type/callback.type";
import UserRouter from "./user.router";

const {MISSED_METHOD_MESSAGE} = require('./user.exception')

function UserModule (data: IReqData, callback: callbackType) {
  
  const acceptableMethods = [
    methods.post,
    methods.get,
    methods.put,
    methods.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    UserRouter[data.method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};

module.exports = UserModule;
