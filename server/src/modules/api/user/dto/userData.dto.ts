import { strOrBool } from "../guard/isString.guard";

export interface IUserDataDto {
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	hashPassword?: strOrBool;
	tosAggrement: boolean;
	checks: string[]
}