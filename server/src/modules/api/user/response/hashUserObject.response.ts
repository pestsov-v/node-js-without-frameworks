import { strOrBool } from "../guard/base.guard";

export interface IHashUserObjectResponse {
	firstName: strOrBool,
	lastName: strOrBool,
	phone: strOrBool,
	hashPassword: strOrBool,
	tosAggrement: boolean
}