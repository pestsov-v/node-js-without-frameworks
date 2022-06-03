import { statusCode } from "../../../core/base/statusCode.enum"

export type callbackType = {
	(statusCode: statusCode, message: string): callbackType
}