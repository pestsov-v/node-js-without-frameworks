import { method } from "../../../../core/base/method.enum";

interface IQuery {
	id: string,
}

interface IPayload {
	id: string
	phone: string,
	password: string,
	extend: boolean,
}

export interface ITokenData {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
	},
	payload: IPayload
}