import { statusCode } from "../../../../core/base/enum/statusCode.enum"
import { messageType } from "./message.type"


export type callbackType = {
	(statusCode: statusCode, Error: messageType): messageType
}
