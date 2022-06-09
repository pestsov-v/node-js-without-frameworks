exports.alertMessage = (method, protocol, url, state) => {
  return `Внимание: Ваш чек для "${method.toUpperCase()}" ${protocol}"//${url} имеет текущее состояние - ${state}`;
};

exports.CHECKS_NOT_FOUND_MESSAGE =
  "Ошибка: Не найден ни один чек для создания процесса";

exports.LOGGING_FAIL_MESSAGE = "Ошибка: Произошла ошибка при логировании файла";
exports.NOT_FOUND_LOGS_MESSAGE =
  "Ошибка: Не найден ни один файл логгирования для создания";
exports.LOGGING_SUCCESS_MESSAGE = "Логгирования файла прошло успешно";

exports.NOT_COMPRESSED_FILE_MESSAGE =
  "Ошибка: Произошла ошибка при сжатии одного из файлов логгирования";

exports.TRUNCATING_FILE_ERROR_MESSAGE =
  "Ошибка: Произошла ошибка при конвертации файла логгирования";

exports.TRUNCATING_FILE_SUCCESS_MESSAGE =
  "Файла логгирования успешно сконвертировался";

exports.NOT_PROPERTY_FORMATTED_MESSAGE =
  "Ошибка: Один или несколько чеков имеют ошибочный формат";
exports.SAVE_UPDATE_CHECKS_ERROR_MESSAGE =
  "Ошибка: Произошла ошибка при сохранении обновлённого чека";
exports.NO_ALERT_NEEDED_MESSAGE =
  "Ошибка: Результирующие файлы не были изменены";
exports.ERROR_SEND_SMS_MESSAGE =
  "Ошибка: СМС не было отправлено пользователю, который изменил состояние чека";
exports.SUCCESS_SEND_SMS_MESSAGE =
  "Пользователь успешно получил обновлённый статус его чека в СМС";
exports.ERROR_READING_CHECKS_MESSAGE =
  "Ошибка: Произошла ошибка при чтении одного из чеков";
