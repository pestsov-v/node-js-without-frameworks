import { I404Data } from "./404Data.dto";
import { callbackType } from "./callback.type";

const statusCode = require("../../../core/base/statusCode");
const { PAGE_NOT_FOUND } = require("./404.exception");
export default function page404 (data: I404Data, callback: callbackType): callbackType {
  return callback(
    statusCode.NOT_FOUND,
    PAGE_NOT_FOUND(data.headers.host, data.trimmedPath)
  );
};