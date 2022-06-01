import { strOrBool } from "../guard/isString.guard";

export interface IUserObject {
	firstName: strOrBool,
	lastName: strOrBool,
    phone: strOrBool,
	password: strOrBool,
	hashPassword: strOrBool,
}
