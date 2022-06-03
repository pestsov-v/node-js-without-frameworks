import statusCode from "../../../core/base/statusCode.enum"

interface message {
	statusCode: statusCode,
	message: string
}

export type Callback404 = {
	(statusCode: statusCode, message: message): Callback404
}
