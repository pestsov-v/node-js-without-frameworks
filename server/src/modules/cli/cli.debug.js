const util = require("util");
const debug = util.debuglog("cli");

const {
  EMPTY_USER_LIST_MESSAGE,
  USER_NOT_EXISTS_MESSAGE,
  EMPTY_CHECK_LIST_MESSAGE,
  USER_ID_NOT_FOUND_MESSAGE,
  CHECK_ID_NOT_FOUND_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  INVALID_CHECK_ID_MESSAGE,
} = require("./constants/cli.constants");

class CLIDebugger {
  EMPTY_USER_LIST() {
    return debug(EMPTY_USER_LIST_MESSAGE);
  }

  USER_NOT_EXISTS(userId) {
    return debug(USER_NOT_EXISTS_MESSAGE(userId));
  }

  EMPTY_CHECK_LIST() {
    return debug(EMPTY_CHECK_LIST_MESSAGE);
  }

  USER_ID_NOT_FOUND(userId) {
    return debug(USER_ID_NOT_FOUND_MESSAGE(userId));
  }

  CHECK_ID_NOT_FOUND(checkId) {
    return debug(CHECK_ID_NOT_FOUND_MESSAGE(checkId));
  }

  INVALID_USER_ID() {
    return debug(INVALID_USER_ID_MESSAGE);
  }

  INVALID_CHECK_ID() {
    return debug(INVALID_CHECK_ID_MESSAGE);
  }
}

module.exports = new CLIDebugger();
