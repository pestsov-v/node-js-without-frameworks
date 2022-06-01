import { ICheckData } from "../dto/checkData.dto";
import { IUserData } from "../dto/userData.dto";

export const GET_USER_ROW_MESSAGE = (userData: IUserData): string => {
  const { firstName, lastName, phone } = userData;
  
  const fullName: string = `${firstName} ${lastName}`;
  return `Полное имя: ${fullName}. Номер телефона (он же и идентификатор): ${phone}. Количество чеков: `;
};

export const GET_CHECK_ROW_MESSAGE = (checkData: ICheckData, stateOrUnknown: string): string => {
  const { id, method, protocol } = checkData;
  const meth: string = method.toUpperCase();
  const prot: string = `${protocol}://`;

  return `Айди чека: ${id}. Метод ${meth}. Адрес сайта: ${prot}. Состояние чека: ${stateOrUnknown}`;
};
