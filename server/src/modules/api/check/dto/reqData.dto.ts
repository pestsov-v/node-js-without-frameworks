import { method } from "../../../../core/base/enum/method.enum";

interface IQuery {
	id: string,
}

export interface IPayload {
	id: string;
	protocol: string;
	url: string;
	method: method
	code: number[]
	time: number
}

export interface ICheckData {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
	},
	payload: IPayload
}