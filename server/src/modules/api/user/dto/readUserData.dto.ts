export interface IReadUserDataDto {
	firstName: string;
	lastName: string;
	phone: string;
	hashPassword?: string;
	tosAggrement: boolean;
}