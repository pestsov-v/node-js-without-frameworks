import { strOrBool } from "../guard/isString.guard";

export interface IHashUserObjectResponse {
	firstName: strOrBool,
	lastName: strOrBool,
	phone: strOrBool,
	hashPassword: strOrBool,
	tosAggrement: boolean
}