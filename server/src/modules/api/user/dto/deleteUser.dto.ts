import { methodEnum } from "../../../../core/base/enum/method.enum";

interface IQuery {
	phone: string,
}


export interface IDeleteUserDto {
	trimmedPath: string,
	queryStringObject: IQuery;
	method: methodEnum
	headers: {
		token: string
	},
}