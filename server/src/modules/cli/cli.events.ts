import events from "events";
class _events extends events {}
export const e = new _events();

import CLIController from "./cli.controller";

import { command } from "./cli.command";

e.on(command.man, () => CLIController.help());
e.on(command.help, () => CLIController.help());
e.on(command.exit, () => CLIController.exit());
e.on(command.stats, () => CLIController.stats());
e.on(command.listUsers, () => CLIController.listUsers());
e.on(command.moreUserInfo, (str: string) => CLIController.moreUserInfo(str));
e.on(command.listChecks, (str: string) => CLIController.listChecks(str));
e.on(command.moreCheckInfo, (str: string) => CLIController.moreCheckInfo(str));
e.on(command.listLogs, () => CLIController.listLogs());
e.on(command.moreLogInfo, (str: string) => CLIController.moreLogInfo(str));
