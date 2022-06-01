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

export interface IReqData {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
	},
	payload: payload
}