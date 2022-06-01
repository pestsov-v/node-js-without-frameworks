import { strOrBool } from "../guard/isString.guard";

export interface IUpdateObj {
	firstName?: strOrBool,
	lastName?: strOrBool,
	password?: strOrBool,
}