import { statusCode } from "../../../core/base/enum/statusCode.enum";

export interface I404Response {
	statusCode: statusCode,
	message: string
}