import { method } from "../../../../core/base/enum/method.enum";

interface IQuery {
	phone: string,
}

export interface IPayload {
	protocol: string;
	url: string;
	method: method
	code: number[]
	time: number
}

export interface IReqData {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
	},
	payload: IPayload
}