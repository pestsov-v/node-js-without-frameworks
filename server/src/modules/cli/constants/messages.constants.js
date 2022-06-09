const EXIT = "Выйти из режима консоли и остановить приложение";
const MAN = "Показать все возможности роботы с консолью";
const HELP = "Элиас для комманды 'man'";

const STATS =
  "Получить статистику по возможностям операционной системы и ресурсам утилизации";

const LIST_USERS =
  "Показать список со всеми зарегистрироваными пользоватями в системе";

const MORE_USER_INFO = "Показать детали по определенному пользователю";

const LIST_CHECKS =
  "Показать список всех активных поверок в системе учитывая их состояние";

const MORE_CHECK_INFO = "Показать детали по определенному чеку";
const LIST_LOGS = "Показать лист всех файлов, которые могут быть прочитаны";
const MORE_LOG_INFO = "Показать детали по определенному файлу логгирования";

const messages = {
  exit: EXIT,
  man: MAN,
  help: HELP,
  stats: STATS,
  listUsers: LIST_USERS,
  moreUserInfo: MORE_USER_INFO,
  listChecks: LIST_CHECKS,
  moreCheckInfo: MORE_CHECK_INFO,
  listLogs: LIST_LOGS,
  moreLogInfo: MORE_LOG_INFO,
};

module.exports = messages;
