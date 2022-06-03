import { method } from "../../../core/base/method.enum";

export interface IOriginalCheckData {
	id: string;
	userPhone: string;
	protocol: string;
	url: string;
	method: method;
	code: number[];
	time: number;
	state: string;
	lastChecked: number
}