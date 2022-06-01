import CLIGraphic from "./cli.graphic";
import CLIHelper from "./cli.helper";
import CLIService from "./cli.service";
import CLIValidator from "./cli.validator";
import CLILogger from "./cli.logger";
import CLIDebugger from "./cli.debug";

import { isString } from "./guard/isString.guard";

export default class CLIController {
  static help(): void {
    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI ОПИСАНИЕ");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(1);
    CLIHelper.getCommands();
    CLIGraphic.verticalSpace(1);
    CLIGraphic.horizontalLine();
  }

  static exit(): void {
    process.exit(0);
  }

  static stats(): void {
    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI Статистика");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(1);
    CLIHelper.getStats();
    CLIGraphic.verticalSpace(1);
    CLIGraphic.horizontalLine();
  }

  static listUsers(): void {
    CLIService.getListUser();
  }

  static listChecks(str: string): void {
    CLIService.getListCheck(str);
  }

  static moreUserInfo(str: string): void {
    const userId = CLIValidator.idValidate(str);
    if (isString(userId)) {
      CLIService.readUser(userId);
    } else {
      CLIDebugger.INVALID_USER_ID();
    }
  }

  static moreCheckInfo(str: string): void {
    const checkId = CLIValidator.idValidate(str);
    if (isString(checkId)) {
      CLIService.readCheck(checkId);
    } else {
      CLIDebugger.INVALID_CHECK_ID();
    }
  }

  static listLogs(): void {
    CLIService.getListLogs();
  }

  static moreLogInfo(str: string): void {
    const fileName = CLIValidator.fileNameValidate(str);
    if (isString(fileName)) {
      CLIGraphic.verticalSpace(1);
      CLILogger.decompressFile(fileName);
  }
}
}