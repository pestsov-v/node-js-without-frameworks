export const USER_WAS_CREATED_MESSAGE = "Пользователь с таким номером телефона уже был зарегистрирован";

export const USER_NOT_CREATED_MESSAGE = "Произошла ошибка при создании пользователя";

export const USER_SUCCESS_CREATE_MESSAGE = (phone: string) => {
  return `Пользователь с телефоном ${phone} был успешно создан`;
};

export const USER_GET_SUCCESS_MESSAGE = (data: any) => {
  return {
    firstName: data.firstName,
    lastName: data.firstName,
    phone: data.firstName,
    tosAggrement: true
  }
}

export const MISSED_METHOD_MESSAGE = "Указанного метода не существует"

export const MISS_REQUIRED_FIELDS_MESSAGE =
  "Пропущено одно или несколько обязательных полей";

export const USER_WAS_BEEN_CREATED_MESSAGE =
  "Пользователь с таким номером телефона уже был создан";

export const INVALID_USER_PHONE_MESSAGE = "Указан не верный формат номера телефона";

export const USER_NOT_AUTH_MESSAGE =
  "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться";

export const USER_NOT_FOUND_MESSAGE =
  "Пользователь с таким номером телефона не был найден";

export const USER_NOT_FIELDS_TO_UPDATE_MESSAGE =
  "Отстуствуют любое из полей, которое следует обновить";

export const USER_NOT_EXISTS_MESSAGE = "Такого пользователя не существует";

export const USER_CAN_NOT_UPDATE_MESSAGE =
  "Невозможно обновить пользователя из-за ошибки на сервере";

export const USER_SUCCESS_UPDATE_MESSAGE = "Пользователь успешно обновлён";

export const USER_PHONE_NOT_FOUND_MESSAGE =
  "Пользователь с таким номером телефона не был найден";

export const USER_SUCCESS_DELETE_MESSAGE = "Пользователь успешно удалён";

export const USER_CAN_NOT_DELETE_MESSAGE =
  "Возникла ошибка при попытке удаления проверок пользователя, в ходе процесса удаления самого пользователя";
