const db = require("../../core/database/db.router");
const router = require("../../core/base/enum/route.enum");
const childProcess = require("child_process");

const CLIGraphic = require("./cli.graphic");
const CLIValidator = require("./cli.validator");
const CLIDebugger = require("./cli.debug");

const {
  GET_USER_ROW_MESSAGE,
  GET_CHECK_ROW_MESSAGE,
} = require("./constants/row.constants");

class CLIService {
  getListUser() {
    db.list(router.users, (err, userIds) => {
      if (userIds.length == 0) CLIDebugger.EMPTY_USER_LIST();
      CLIGraphic.verticalSpace(1);

      userIds.forEach((userId) => {
        db.read(router.users, userId, (err, userData) => {
          if (err) CLIDebugger.USER_NOT_EXISTS(userId);
          let row = GET_USER_ROW_MESSAGE(userData);

          let numberOfChecks = CLIValidator.checksValidate(userData.checks);
          row += numberOfChecks;
          console.log(row);
        });
      });
    });
  }

  getListCheck(str) {
    db.list(router.checks, (err, checkIds) => {
      if (err) CLIDebugger.EMPTY_CHECK_LIST();
      CLIGraphic.verticalSpace(1);

      checkIds.forEach((checkId) => {
        db.read(router.checks, checkId, (err, checkData) => {
          const lowerString = str.toLowerCase();
          const state = CLIValidator.checksValidate(checkData.state);
          const stateOrUnknown = CLIValidator.unknownValidate(checkData.state);
          const matchedStr = CLIValidator.lowerStrValidate(lowerString, state);

          if (matchedStr === true) {
            const row = GET_CHECK_ROW_MESSAGE(checkData, stateOrUnknown);
            console.log(row);
          }
        });
      });
    });
  }

  getListLogs() {
    const ls = childProcess.spawn("ls", ["./.logs/"]);
    ls.stdout.on("data", (dataObj) => {
      var dataStr = dataObj.toString();
      var logFileNames = dataStr.split("\n");
      logFileNames.forEach(function (logFileName) {
        CLIValidator.logFileValidate(logFileName);
        if (CLIValidator.logFileValidate(logFileName)) {
          console.log(logFileName.trim().split(".")[0]);
        }
      });
    });
  }

  readUser(userId) {
    db.read(router.users, userId, function (err, userData) {
      if (err) CLIDebugger.USER_ID_NOT_FOUND(userId);
      delete userData.hashedPassword;
      console.dir(userData, { colors: true });
    });
  }

  readCheck(checkId) {
    db.read(router.checks, checkId, function (err, checkData) {
      if (err) CLIDebugger.CHECK_ID_NOT_FOUND(checkId);
      console.dir(checkData, { colors: true });
      CLIGraphic.verticalSpace(1);
    });
  }
}

module.exports = new CLIService();
