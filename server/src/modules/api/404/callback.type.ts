import { statusCode } from "../../../core/base/enum/statusCode.enum"

export type callbackType = {
	(statusCode: statusCode, message: string): callbackType
}