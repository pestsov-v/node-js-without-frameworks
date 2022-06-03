import { strOrBool } from "../guard/base.guard";

export interface IUserDataDto {
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	hashPassword?: string;
	tosAggrement: boolean;
	checks: string[]
}