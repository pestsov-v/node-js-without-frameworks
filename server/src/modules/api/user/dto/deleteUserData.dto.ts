export interface IDeleteUserDataDto {
	firstName: string;
	lastName: string;
	phone: string;
	hashPassword: string;
	tosAggrement: boolean;
	checks: string[]
}