import childProcess from "child_process";
const db = require("../../core/database/db.router");
import { router } from "../../core/base/enum/router.enum";
import { IUserData } from "./dto/userData.dto";
import { ICheckData } from "./dto/checkData.dto";

import CLIGraphic from "./cli.graphic";
import CLIValidator from "./cli.validator";
import CLIDebugger from "./cli.debug";

import { 
  GET_USER_ROW_MESSAGE, 
  GET_CHECK_ROW_MESSAGE 
} from "./constants/row.constants";

export default class CLIService {
  static getListUser(): void {
    db.list(router.users, (err: Error, userIds: string[]): void => {
      if (userIds.length == 0) CLIDebugger.EMPTY_USER_LIST();
      CLIGraphic.verticalSpace(1);

      userIds.forEach((userId: string): void => {
        db.read(router.users, userId, (err: Error, userData: IUserData) => {
          if (err) CLIDebugger.USER_NOT_EXISTS(userId);
          let row: string = GET_USER_ROW_MESSAGE(userData);

          let numberOfChecks: number = CLIValidator.checksValidate(userData.checks);
          row += numberOfChecks;
          console.log(row);
        });
      });
    });
  }

  static getListCheck(str: string): void {
    db.list(router.checks, (err: Error, checkIds: string[]): void => {
      if (err) CLIDebugger.EMPTY_CHECK_LIST();
      CLIGraphic.verticalSpace(1);

      checkIds.forEach((checkId: string): void => {
        db.read(router.checks, checkId, (err: Error, checkData: ICheckData) => {
          const lowerString: string = str.toLowerCase();
          const state: string = CLIValidator.stateValidate(checkData.state);
          const stateOrUnknown: string = CLIValidator.unknownValidate(checkData.state);
          const matchedStr: boolean = CLIValidator.lowerStrValidate(lowerString, state);

          if (matchedStr) {
            const row = GET_CHECK_ROW_MESSAGE(checkData, stateOrUnknown);
            console.log(row);
          }
        });
      });
    });
  }

  static getListLogs(): void {
    const ls = childProcess.spawn("ls", ["./data/logs/"]);
    ls.stdout.on("data", (dataObj: Buffer): void => {
      const dataStr = dataObj.toString();
      const logFileNames = dataStr.split("\n");
      logFileNames.forEach((logFileName: string): void => {
        CLIValidator.logFileValidate(logFileName);
        if (CLIValidator.logFileValidate(logFileName)) {
          console.log(logFileName.trim().split(".")[0]);
        }
      });
    });
  }

  static readUser(userId: string): void {
    db.read(router.users, userId, (err: Error, userData: IUserData): void => {
      if (err) CLIDebugger.USER_ID_NOT_FOUND(userId);
      delete userData.hashPassword;
      console.dir(userData, { colors: true });
    });
  }

  static readCheck(checkId: string): void {
    db.read(router.checks, checkId, (err: Error, checkData: ICheckData): void => {
      if (err) CLIDebugger.CHECK_ID_NOT_FOUND(checkId);
      console.dir(checkData, { colors: true });
      CLIGraphic.verticalSpace(1);
    });
  }
}