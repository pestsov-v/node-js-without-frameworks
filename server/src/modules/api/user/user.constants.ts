exports.USER_WAS_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был зарегистрирован";

exports.USER_NOT_CREATED_MESSAGE = "Произошла ошибка при создании пользователя";

exports.USER_SUCCESS_CREATE_MESSAGE = (phone: string) => {
  return `Пользователь с телефоном ${phone} был успешно создан`;
};

exports.MISS_REQUIRED_FIELDS_MESSAGE =
  "Пропущено одно или несколько обязательных полей";

exports.USER_WAS_BEEN_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был создан";

exports.INVALID_USER_PHONE_MESSAGE = "Указан не верный формат номера телефона";

exports.USER_NOT_AUTH_MESSAGE =
  "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться";

exports.USER_NOT_FOUND_MESSAGE =
  "Пользователь с таким номером телефона не был найден";

exports.USER_NOT_FIELDS_TO_UPDATE_MESSAGE =
  "Отстуствуют любое из полей, которое следует обновить";

exports.USER_NOT_EXISTS_MESSAGE = "Такого пользователя не существует";

exports.USER_CAN_NOT_UPDATE_MESSAGE =
  "Невозможно обновить пользователя из-за ошибки на сервере";

exports.USER_SUCCESS_UPDATE_MESSAGE = "Пользователь успешно обновлён";

exports.USER_PHONE_NOT_FOUND_MESSAGE =
  "Пользователь с таким номером телефона не был найден";

exports.USER_SUCCESS_DELETE_MESSAGE = "Пользователь успешно удалён";

exports.USER_CAN_NOT_DELETE_MESSAGE =
  "Возникла ошибка при попытке удаления проверок пользователя, в ходе процесса удаления самого пользователя";
