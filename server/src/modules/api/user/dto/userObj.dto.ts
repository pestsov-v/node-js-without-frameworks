import { strOrBool } from "../guard/isString.guard";

export interface IUserObj {
	firstName: strOrBool,
	lastName: strOrBool,
	phone: strOrBool,
	password: strOrBool,
}