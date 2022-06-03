import { method } from "../../../../core/base/enum/method.enum"

export interface ICheckDataDto {
	id: string;
	userPhone: string;
	protocol: string;
	url: string;
	method: method;
	code: number[];
	time: number;
	state: string;
	lastChecked: string
}