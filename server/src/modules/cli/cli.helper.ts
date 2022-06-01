import { command } from "./cli.command";
import { message } from "./constants/message.constants"
import { stats } from "./constants/stats.constants"
import { getCommandsDescriptionResponse } from "./response/getCommandsDescription.response";

export default class CLIHelper {
  protected static getCommandsDescription(): getCommandsDescriptionResponse {
    return {
      exit: message.exit,
      man: message.man,
      help: message.help,
      stats: message.stats,
      "List users": message.listUsers,
      "More user info --{userId}": message.moreUserInfo,
      "List checks --up --down": message.listChecks,
      "More check info --{checkId}": message.moreCheckInfo,
      "List logs": message.listLogs,
      "More log info --{logFileName}": message.moreLogInfo,
    };
  }

  static getCommands() {
    const commands: getCommandsDescriptionResponse = this.getCommandsDescription();
    for (let key in commands) {
      if (commands.hasOwnProperty(key)) {
        let value = commands[key as keyof typeof commands];
        let line = "\x1b[33m " + key + "\x1b[0m";
        const padding = 60 - line.length;

        for (let i = 0; i < padding; i++) {
          line += " ";
        }
        line += value;
        console.log(line);
      }
    }
  }

   protected static getStatsDescription() {
    return {
      "Среднняя нагрузка: ": stats.loadAverage,
      "Количество потоков: ": stats.cpuCount,
      "Свободная память: ": stats.freeMemory,
      "Текущая занятая память: ": stats.currentMallocedMemmory,
      "Пиковая занятая память: ": stats.peakMallocedMemory,
      "Использованая выделеная память (%): ": stats.allocatedHeapUsed,
      "Доступная выделеная память (%): ": stats.availableHeapAllocated,
      "Время безотказной работы: ": stats.uptime,
    };
  }

  static getStats() {
    const stats = this.getStatsDescription();
    for (const key in stats) {
      if (stats.hasOwnProperty(key)) {
        const value = stats[key as keyof typeof stats];
        let line = "\x1b[33m " + key + "\x1b[0m";
        const padding = 10 - line.length;
        for (let i = 0; i < padding; i++) {
          line += " ";
        }
        line += value;
        console.log(line);
      }
    }
  }

  static getCommandsArray() {
    const array = [
      command.man,
      command.help,
      command.exit,
      command.stats,
      command.listUsers,
      command.moreUserInfo,
      command.listChecks,
      command.moreCheckInfo,
      command.listLogs,
      command.moreLogInfo,
    ];

    return array;
  }
}
