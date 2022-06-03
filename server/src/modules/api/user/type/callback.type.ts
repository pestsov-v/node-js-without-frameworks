import statusCode from "../../../../core/base/statusCode.enum"

interface message {
	statusCode: statusCode,
	Error: string
}

export type userCallback = {
	(statusCode: statusCode, message: message | string): userCallback
}
