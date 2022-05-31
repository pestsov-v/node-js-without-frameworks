const CLIGraphic = require("./cli.graphic");
const CLIHelper = require("./cli.helper");
const CLIService = require("./cli.service");
const CLIValidator = require("./cli.validator");
const CLILogger = require("./cli.logger");

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
    if (!userId) console.log("Ведён не коректный userId");
    CLIService.readUser(userId);
  }

  moreCheckInfo(str) {
    const checkId = CLIValidator.idValidate(str);
    if (!checkId) console.log("Ведён не коректный checkId");
    CLIService.readCheck(checkId);
  }

  listLogs() {
    CLIService.getListLogs();
  }

  moreLogInfo(str) {
    const fileName = CLIValidator.fileNameValidate(str);
    console.log(fileName);
    CLIGraphic.verticalSpace(1);
    CLILogger.decompressFile(fileName);
  }
}

module.exports = new CLIController();
