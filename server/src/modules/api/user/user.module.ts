import { method } from "../../../core/base/enum/method.enum";
import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { IReqData } from "./dto/reqData.dto";
import UserRouter from "./user.router";
import { MISSED_METHOD_MESSAGE } from './user.constants'


export default  function UserModule (data: IReqData, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    UserRouter[data.method](data, callback);
  } else {
    callback(statusCode.BAD_REQUEST, MISSED_METHOD_MESSAGE);
  }
};