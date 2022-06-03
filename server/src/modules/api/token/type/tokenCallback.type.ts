import statusCode from "../../../../core/base/statusCode.enum"

interface message {
	statusCode: statusCode,
	Error: string
}

export type tokenCallback = {
	(statusCode: statusCode, message: message): tokenCallback
}
