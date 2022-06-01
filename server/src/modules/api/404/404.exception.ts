import { statusCode } from "../../../core/base/enum/statusCode.enum";
import { I404Response } from "./404.response";
import { PAGE_NOT_FOUND_MESSAGE } from "./404.constants";

export const PAGE_NOT_FOUND = (host: string, path: string): I404Response => {
  return {
    statusCode: statusCode.NOT_FOUND,
    message: PAGE_NOT_FOUND_MESSAGE(host, path),
  };
};
