import { methodEnum } from "../../../../core/base/enum/method.enum";

interface payload {
	firstName: string,
	lastName: string,
	phone: string,
	password: string,
	tosAggrement: boolean
}

export interface ICreateUserDto {
	trimmedPath: string,
	queryStringObject: string;
	method: methodEnum
	headers: object,
	payload: payload
}