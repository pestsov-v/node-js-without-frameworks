export const EMPTY_USER_LIST_MESSAGE = "Список пользователей пуст";
export const EMPTY_CHECK_LIST_MESSAGE = "Список чеков пуст";
export const USER_NOT_EXISTS_MESSAGE = (userId: string) => {
  return `Пользователя с ID ${userId} не существует`;
};

export const USER_ID_NOT_FOUND_MESSAGE = (userId: string) => {
  return `Пользователь с таким ${userId} не был найден или он не существует`;
};

export const CHECK_ID_NOT_FOUND_MESSAGE = (checkId: string) => {
  return `Чек с таким ${checkId} не был найден или он не существует`;
};

export const INVALID_USER_ID_MESSAGE = "Ведён не коректный userId";
export const INVALID_CHECK_ID_MESSAGE = "Ведён не коректный checkId";
