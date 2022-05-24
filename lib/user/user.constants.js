exports.USER_WAS_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был зарегистрирован";

exports.USER_NOT_CREATED_MESSAGE = "Произошла ошибка при создании пользователя";

exports.USER_SUCCESS_CREATE_MESSAGE = (phone) => {
  return `Пользователь с телефоном ${phone} был успешно создан`;
};

exports.USER_WAS_BEEN_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был создан";

exports.INVALID_USER_PHONE_MESSAGE = "Указан не верный формат номера телефона";

exports.USER_NOT_AUTH_MESSAGE =
  "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться";

exports.USER_NOT_FOUND_MESSAGE =
  "Пользователь с таким номером телефона не был найден";
