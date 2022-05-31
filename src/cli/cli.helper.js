const commands = require("./cli.commands");
const messages = require("./constants/messages.constants");
const stats = require("./constants/stats.constants");


class CLIHelper {
  getCommandsDescription() {
    return {
      exit: messages.exit,
      man: messages.man,
      help: messages.help,
      stats: messages.stats,
      "List users": messages.listUsers,
      "More user info --{userId}": messages.moreUserInfo,
      "List checks --up --down": messages.listChecks,
      "More check info --{checkId}": messages.moreCheckInfo,
      "List logs": messages.listLogs,
      "More log info --{logFileName}": messages.moreLogInfo,
    };
  }

  getCommands() {
    const commands = this.getCommandsDescription();
    for (const key in commands) {
      if (commands.hasOwnProperty(key)) {
        const value = commands[key];
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

  getStatsDescription() {
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

  getStats() {
    const stats = this.getStatsDescription();
    for (const key in stats) {
      if (stats.hasOwnProperty(key)) {
        const value = stats[key];
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

  getCommandsArray() {
    const array = [
      commands.man,
      commands.help,
      commands.exit,
      commands.stats,
      commands.listUsers,
      commands.moreUserInfo,
      commands.listChecks,
      commands.moreCheckInfo,
      commands.listLogs,
      commands.moreLogInfo,
    ];

    return array;
  }
}

module.exports = new CLIHelper();
