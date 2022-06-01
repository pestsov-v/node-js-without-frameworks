export const GET_USER_ROW_MESSAGE = (userData) => {
  const { firstName, lastName, phone } = userData;
  const fullName = `${firstName} ${lastName}`;
  return `Полное имя: ${fullName}. Номер телефона (он же и идентификатор): ${phone}. Количество чеков: `;
};

export const GET_CHECK_ROW_MESSAGE = (userData, stateOrUnknown) => {
  const { id, method, protocol } = userData;
  const meth = method.toUpperCase();
  const prot = `${protocol}://`;

  return `Айди чека: ${id}. Метод ${meth}. Адрес сайта: ${prot}. Состояние чека: ${stateOrUnknown}`;
};
