export const TOKEN_NOT_FOUND_MESSAGE = (id: string): string => {
  return `Такой токен ${id} не был найден`;
};

export const MISSED_REQUIRE_FIEILDS_MESSAGE = "Пропущено одно или несколько из обязательных полей";
export const USER_NOT_AUTH_MESSAGE = "Пользователь не авторизован. Чтобы создать проверку необходимо авторизоватся";
export const GET_MAX_CHECKS_MESSAGE = "Пользователь превысил максимальное количество запросов. Максимальное количество запросов - 5";
export const SERVER_CREATE_CHECK_MESSAGE = "Произошла ошибка при создании проверки";
export const SERVER_UPDATE_CHECK_MESSAGE = "Произошла ошибка при обновлении проверки";
export const INCORRECT_PHONE_MESSAGE = "Указан не верный формат номера телефона";
export const USER_NOT_AUTH_GET_MESSAGE = "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться";
export const EMPTY_UPDATE_FILEDS_MESSAGE = "Отсутствует любое поле для последующего обновления";
export const CHECK_NOT_FOUND_MESSAGE = "Проверка не была найдена, поскольку она не существует";
export const CHECK_NOT_AUTH_UPDATE_MESSAGE = "Вы не авторизованы. Чтобы обновить проверку необходимо сперва авторизироваться";
export const SERVER_ERROR_UPDATE_MESSAGE = "Произошла ошибка при обновлении проверки";
export const CHECK_UPDATE_SUCCESS_MESSAGE = "Проверка была успешно обновлена";
export const CHECK_NOT_FOUND_ID_MESSAGE = "Проверка не была найдена по данной ID";
export const CHECK_NOT_AUTH_DELETE_MESSAGE = "Вы не авторизованы. Чтобы удалить проверку необходимо сперва авторизироваться";
export const SERVER_ERROR_DELETE_MESSAGE = "Произошла ошибка при удалении проверки";
export const USER_NOT_FOUND_MESSAGE = "Не найден пользователь с данным номером телефона";
export const USER_EMPTY_CHECKS_MESSAGE = "Не удалось найти проверку в списке проверок пользователя. Проверка не была удалена из списка проверок";
export const CHECK_DELETE_SUCCESS_MESSAGE = "Проверка была успешно удалена";
export const INVALID_HOSTNAME_MESSAGE = "Данная строка не является сайтом и не ведёт ни на один сайт. Пожалуйста введите адресс сайта";
