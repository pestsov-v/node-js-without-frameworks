import { statusCode } from "../../../../core/base/enum/statusCode.enum"

export interface IDeleteUserResponse {
	statusCode: statusCode,
	Error: string,
}
