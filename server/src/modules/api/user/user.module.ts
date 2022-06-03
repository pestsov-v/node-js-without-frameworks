import method from "../../../core/base/method.enum";
import statusCode from "../../../core/base/statusCode.enum";

import UserRouter from "./user.router";

import { IUserData } from "./dto/reqData.dto";
import { MISSED_METHOD_MESSAGE } from './user.constants'
import { userCallback } from "./type/callback.type";


export default  function UserModule (data: IUserData, callback: userCallback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    UserRouter[data.method as keyof typeof method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};