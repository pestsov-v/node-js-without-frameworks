import { statusCode } from "../../../../core/base/statusCode.enum"

export interface ICreateUserResponse {
	statusCode: statusCode,
	message: string,
}
