import statusCode from "../../../core/base/statusCode.enum";
import { I404Data } from "./404Data.dto";
import { PAGE_NOT_FOUND } from "./404.exception";

export default function page404 (data: I404Data, callback) {
  return callback(statusCode.NOT_FOUND, PAGE_NOT_FOUND(data.headers.host, data.trimmedPath));
};