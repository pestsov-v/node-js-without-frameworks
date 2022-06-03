import { statusCode } from "../../../core/base/statusCode.enum";

export interface I404Response {
	statusCode: statusCode,
	message: string
}