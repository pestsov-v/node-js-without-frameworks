import { methodEnum } from "../../../../core/base/enum/method.enum";

interface payload {
	firstName?: string,
	lastName?: string,
	phone: string,
	password?: string,
}

export interface IUpdateUserDto {
	trimmedPath: string,
	queryStringObject: string;
	method: methodEnum
	headers: {
		token: string
	},
	payload: payload
}