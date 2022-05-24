exports.USER_WAS_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был зарегистрирован";

exports.USER_NOT_CREATED_MESSAGE = "Произошла ошибка при создании пользователя";

exports.USER_SUCCESS_CREATE_MESSAGE = (phone) => {
  return `Пользователь с телефоном ${phone} был успешно создан`;
};

exports.USER_WAS_BEEN_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был создан";
