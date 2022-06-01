import { strOrBool } from "../guard/isString.guard";

export interface IUpdateUserDataDto {
	firstName?: strOrBool,
	lastName?: strOrBool,
	hashPassword?: strOrBool,
}