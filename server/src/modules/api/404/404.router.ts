import statusCode from "../../../core/base/statusCode.enum";
import { I404Data } from "./404Data.dto";
import { PAGE_NOT_FOUND } from "./404.exception";
import { Callback404 } from "./callback.type";

export default function page404 (data: I404Data, callback: Callback404) {
  return callback(statusCode.NOT_FOUND, PAGE_NOT_FOUND(data.headers.host, data.trimmedPath));
};