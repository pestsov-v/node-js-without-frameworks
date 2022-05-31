exports.EMPTY_USER_LIST_MESSAGE = "Список пользователей пуст";
exports.EMPTY_CHECK_LIST_MESSAGE = "Список чеков пуст";
exports.USER_NOT_EXISTS_MESSAGE = (userId) => {
  return `Пользователя с ID ${userId} не существует`;
};

exports.USER_ID_NOT_FOUND_MESSAGE = (userId) => {
  return `Пользователь с таким ${userId} не был найден или он не существует`;
};

exports.CHECK_ID_NOT_FOUND_MESSAGE = (checkId) => {
  return `Чек с таким ${checkId} не был найден или он не существует`;
};

exports.INVALID_USER_ID_MESSAGE = "Ведён не коректный userId";
exports.INVALID_CHECK_ID_MESSAGE = "Ведён не коректный checkId";
