import statusCode from "../base/statusCode.enum";

interface message {
	statusCode: statusCode,
	Error: string | null
}

export interface dbGetCallback {
	(message: message | boolean): message | boolean
}

export interface dbReadCallback {
	(err: Error | boolean, data: string): string
}

export interface dbUpdateCallback {
	(message: message | boolean): message | boolean
}

export interface dbDeleteCallback {
	(message: message | boolean): message | boolean
}

export interface dbListCallback {
	(err: Error | boolean, data: string[]): string[]
}