export const alertMessage = (method: string, protocol: string, url: string, state: string) => {
  return `Внимание: Ваш чек для "${method.toUpperCase()}" ${protocol}"//${url} имеет текущее состояние - ${state}`;
};
export const CHECKS_NOT_FOUND_MESSAGE: string = "Ошибка: Не найден ни один чек для создания процесса";
export const LOGGING_FAIL_MESSAGE: string = "Ошибка: Произошла ошибка при логировании файла";
export const NOT_FOUND_LOGS_MESSAGE: string = "Ошибка: Не найден ни один файл логгирования для создания";
export const LOGGING_SUCCESS_MESSAGE: string = "Логгирования файла прошло успешно";
export const NOT_COMPRESSED_FILE_MESSAGE: string = "Ошибка: Произошла ошибка при сжатии одного из файлов логгирования";
export const TRUNCATING_FILE_ERROR_MESSAGE: string = "Ошибка: Произошла ошибка при конвертации файла логгирования";
export const TRUNCATING_FILE_SUCCESS_MESSAGE: string = "Файла логгирования успешно сконвертировался";
export const NOT_PROPERTY_FORMATTED_MESSAGE: string = "Ошибка: Один или несколько чеков имеют ошибочный формат";
export const SAVE_UPDATE_CHECKS_ERROR_MESSAGE: string = "Ошибка: Произошла ошибка при сохранении обновлённого чека";
export const NO_ALERT_NEEDED_MESSAGE: string = "Ошибка: Результирующие файлы не были изменены";
export const ERROR_SEND_SMS_MESSAGE: string = "Ошибка: СМС не было отправлено пользователю, который изменил состояние чека";
export const SUCCESS_SEND_SMS_MESSAGE: string = "Пользователь успешно получил обновлённый статус его чека в СМС";
export const ERROR_READING_CHECKS_MESSAGE: string = "Ошибка: Произошла ошибка при чтении одного из чеков";
