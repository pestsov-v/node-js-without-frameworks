import { method } from "../../../../core/base/enum/method.enum";

interface IQuery {
	phone: string,
}


interface payload {
	firstName: string,
	lastName: string,
	phone: string,
	password: string,
	tosAggrement: boolean
}

export interface ICreateUserDto {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: object,
	payload: payload
}