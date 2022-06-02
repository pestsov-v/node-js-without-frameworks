import util from "util";
import { errOrNull } from "../logger/type/errorOrNull.type";
const debug = util.debuglog("workers");

import {
   CHECKS_NOT_FOUND_MESSAGE, 
  TRUNCATING_FILE_SUCCESS_MESSAGE, 
  TRUNCATING_FILE_ERROR_MESSAGE, 
  NOT_COMPRESSED_FILE_MESSAGE, 
  LOGGING_SUCCESS_MESSAGE, 
  NOT_FOUND_LOGS_MESSAGE, 
  LOGGING_FAIL_MESSAGE, 
  SUCCESS_SEND_SMS_MESSAGE, 
  ERROR_SEND_SMS_MESSAGE, 
  NO_ALERT_NEEDED_MESSAGE, 
  SAVE_UPDATE_CHECKS_ERROR_MESSAGE, 
  NOT_PROPERTY_FORMATTED_MESSAGE 
} from "./worker.constants";

export default class WorkerDebugger {
  static CHECKS_NOT_FOUND(): void  {
    return debug(CHECKS_NOT_FOUND_MESSAGE);
  }

  static LOGGING_FAIL(): void  {
    return debug(LOGGING_FAIL_MESSAGE);
  }

  static NOT_FOUND_LOGS(): void  {
    return debug(NOT_FOUND_LOGS_MESSAGE);
  }

  static LOGGING_SUCCESS(): void  {
    return debug(LOGGING_SUCCESS_MESSAGE);
  }

  static NOT_COMPRESSED_FILE(err: errOrNull): void  {
    return debug(NOT_COMPRESSED_FILE_MESSAGE, err);
  }

  static TRUNCATING_FILE_ERROR(): void  {
    return debug(TRUNCATING_FILE_ERROR_MESSAGE);
  }

  static TRUNCATING_FILE_SUCCESS(): void  {
    return debug(TRUNCATING_FILE_SUCCESS_MESSAGE);
  }

  static NOT_PROPERTY_FORMATTED(): void  {
    return debug(NOT_PROPERTY_FORMATTED_MESSAGE);
  }
  static SAVE_UPDATE_CHECKS_ERROR(): void  {
    return debug(SAVE_UPDATE_CHECKS_ERROR_MESSAGE);
  }
  
  static NO_ALERT_NEEDED(): void  {
    return debug(NO_ALERT_NEEDED_MESSAGE);
  }

  static ERROR_SEND_SMS(err: errOrNull): void   {
    return debug(ERROR_SEND_SMS_MESSAGE, err);
  }
  
  static SUCCESS_SEND_SMS(msg: Error | string): void  {
    return debug(SUCCESS_SEND_SMS_MESSAGE, msg);
  }

  static ERROR_READING_CHECKS(err: errOrNull): void {
    return debug(ERROR_SEND_SMS_MESSAGE, err);
  }
}