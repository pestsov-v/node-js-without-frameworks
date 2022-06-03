import method from "../../../core/base/method.enum";
import { IReqData } from "../user/dto/reqData.dto";
import TokenRouter from "./token.router";

export default function TokenModule (data: IReqData, callback) {
  const acceptableMethods = [
    method.post,
    method.get,
    method.put,
    method.delete,
  ];
  if (acceptableMethods.indexOf(data.method) > -1) {
    TokenRouter[data.method](data, callback);
  } else {
    callback(405);
  }
};