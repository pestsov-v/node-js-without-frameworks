const events = require("events");
class _events extends events {}
const e = new _events();

const CLIController = require("./cli.controller");
const commands = require("./cli.commands");

e.on(commands.man, () => CLIController.help());
e.on(commands.help, () => CLIController.help());
e.on(commands.exit, () => CLIController.exit());
e.on(commands.stats, () => CLIController.stats());
e.on(commands.listUsers, () => CLIController.listUsers());
e.on(commands.moreUserInfo, (str) => CLIController.moreUserInfo(str));
e.on(commands.listChecks, (str) => CLIController.listChecks(str));
e.on(commands.moreCheckInfo, (str) => CLIController.moreCheckInfo(str));
e.on(commands.listLogs, () => CLIController.listLogs());
e.on(commands.moreLogInfo, (str) => CLIController.moreLogInfo(str));

module.exports = e;
