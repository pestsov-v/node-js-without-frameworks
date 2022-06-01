import { method } from "../../../../core/base/enum/method.enum";

interface IQuery {
	phone: string,
}


export interface IDeleteUserDto {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: method
	headers: {
		token: string
	},
}