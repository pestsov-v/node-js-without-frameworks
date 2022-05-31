const CLIGraphic = require("./cli.graphic");
const CLIHelper = require("./cli.helper");
const CLIService = require("./cli.service");
const CLIValidator = require("./cli.validator");
const CLILogger = require("./cli.logger");
const CLIDebugger = require("./cli.debug");

class CLIController {
  help() {
    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI ОПИСАНИЕ");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(1);
    CLIHelper.getCommands();
    CLIGraphic.verticalSpace(1);
    CLIGraphic.horizontalLine();
  }

  exit() {
    process.exit(0);
  }

  stats() {
    CLIGraphic.horizontalLine();
    CLIGraphic.centered("CLI Статистика");
    CLIGraphic.horizontalLine();
    CLIGraphic.verticalSpace(1);
    CLIHelper.getStats();
    CLIGraphic.verticalSpace(1);
    CLIGraphic.horizontalLine();
  }

  listUsers() {
    CLIService.getListUser();
  }

  listChecks(str) {
    CLIService.getListCheck(str);
  }

  moreUserInfo(str) {
    const userId = CLIValidator.idValidate(str);
    if (!userId) CLIDebugger.INVALID_USER_ID();
    CLIService.readUser(userId);
  }

  moreCheckInfo(str) {
    const checkId = CLIValidator.idValidate(str);
    if (!checkId) CLIDebugger.INVALID_CHECK_ID();
    CLIService.readCheck(checkId);
  }

  listLogs() {
    CLIService.getListLogs();
  }

  moreLogInfo(str) {
    const fileName = CLIValidator.fileNameValidate(str);
    CLIGraphic.verticalSpace(1);
    CLILogger.decompressFile(fileName);
  }
}

module.exports = new CLIController();
