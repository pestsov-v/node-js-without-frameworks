import util from "util";
const debug = util.debuglog("cli");

import { 
  EMPTY_USER_LIST_MESSAGE, 
  USER_NOT_EXISTS_MESSAGE, 
  EMPTY_CHECK_LIST_MESSAGE, 
  USER_ID_NOT_FOUND_MESSAGE, 
  CHECK_ID_NOT_FOUND_MESSAGE, 
  INVALID_USER_ID_MESSAGE, 
  INVALID_CHECK_ID_MESSAGE 
} from "./constants/cli.constants";

export default class CLIDebugger {
  static EMPTY_USER_LIST(): void {
    return debug(EMPTY_USER_LIST_MESSAGE);
  }

  static USER_NOT_EXISTS(userId: string): void {
    return debug(USER_NOT_EXISTS_MESSAGE(userId));
  }

  static EMPTY_CHECK_LIST(): void {
    return debug(EMPTY_CHECK_LIST_MESSAGE);
  }

  static USER_ID_NOT_FOUND(userId: string): void {
    return debug(USER_ID_NOT_FOUND_MESSAGE(userId));
  }

  static CHECK_ID_NOT_FOUND(checkId: string): void {
    return debug(CHECK_ID_NOT_FOUND_MESSAGE(checkId));
  }

  static INVALID_USER_ID(): void {
    return debug(INVALID_USER_ID_MESSAGE);
  }

  static INVALID_CHECK_ID(): void {
    return debug(INVALID_CHECK_ID_MESSAGE);
  }
}