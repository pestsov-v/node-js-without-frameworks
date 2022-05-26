exports.MISSED_REQUIRE_FIEILDS_MESSAGE =
  "Пропущено одно или несколько из обязательных полей";

exports.USER_NOT_AUTH_MESSAGE =
  "Пользователь не авторизован. Чтобы создать проверку необходимо авторизоватся";

exports.GET_MAX_CHECKS_MESSAGE =
  "Пользователь превысил максимальное количество запросов. Максимальное количество запросов - 5";

exports.SERVER_CREATE_CHECK_MESSAGE = "Произошла ошибка при создании проверки";

exports.SERVER_UPDATE_CHECK_MESSAGE =
  "Произошла ошибка при обновлении проверки";

exports.INCORRECT_PHONE_MESSAGE = "Указан не верный формат номера телефона";

exports.TOKEN_NOT_FOUND_MESSAGE = (id) => {
  return `Такой токен ${id} не был найден`;
};

exports.USER_NOT_AUTH_GET_MESSAGE =
  "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться";

exports.EMPTY_UPDATE_FILEDS_MESSAGE =
  "Отсутствует любое поле для последующего обновления";

exports.CHECK_NOT_FOUND_MESSAGE =
  "Проверка не была найдена, поскольку она не существует";

exports.CHECK_NOT_AUTH_UPDATE_MESSAGE =
  "Вы не авторизованы. Чтобы обновить проверку необходимо сперва авторизироваться";

exports.SERVER_ERROR_UPDATE_MESSAGE =
  "Произошла ошибка при обновлении проверки";

exports.CHECK_UPDATE_SUCCESS_MESSAGE = "Проверка была успешно обновлена";

exports.CHECK_NOT_FOUND_ID_MESSAGE = "Проверка не была найдена по данной ID";

exports.CHECK_NOT_AUTH_DELETE_MESSAGE =
  "Вы не авторизованы. Чтобы удалить проверку необходимо сперва авторизироваться";

exports.SERVER_ERROR_DELETE_MESSAGE = "Произошла ошибка при удалении проверки";

exports.USER_NOT_FOUND_MESSAGE =
  "Не найден пользователь с данным номером телефона";

exports.USER_EMPTY_CHECKS_MESSAGE =
  "Не удалось найти проверку в списке проверок пользователя. Проверка не была удалена из списка проверок";

exports.CHECK_DELETE_SUCCESS_MESSAGE = "Проверка была успешно удалена";
