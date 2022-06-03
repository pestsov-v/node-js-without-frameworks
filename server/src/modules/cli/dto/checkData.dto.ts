import { method } from "../../../core/base/method.enum"
import { statusCode } from "../../../core/base/statusCode.enum"

export interface ICheckData {
	id: string;
	userPhone: string;
	protocol: string;
	url: string;
	method: method;
	code: statusCode[];
	time: number;
	state: string;
	lastChecked: Date
}