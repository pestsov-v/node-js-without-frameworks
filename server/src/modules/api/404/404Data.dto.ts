import method from "../../../core/base/method.enum";

interface IQuery {
	phone: string,
}

interface IPayload {
	firstName: string,
	lastName: string,
	phone: string,
	password: string,
	tosAggrement: boolean
}

export interface I404Data {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
		host: string
	},
	payload: IPayload
}