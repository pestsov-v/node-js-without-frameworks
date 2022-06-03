import statusCode from "../../../../core/base/statusCode.enum"

interface message {
	statusCode: statusCode,
	Error: string
}

export type checkCallback = {
	(statusCode: statusCode, message: message): checkCallback
}
