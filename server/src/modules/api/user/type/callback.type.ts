import { statusCode } from "../../../../core/base/statusCode.enum"
import { messageType } from "./message.type"


export type callbackType = {
	(statusCode: statusCode, Error: messageType): messageType
}
