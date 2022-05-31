import { statusCode } from "../../../../core/base/enum/statusCode.enum"

export interface ICreateUserResponse {
	statusCode: statusCode,
	message: string,
}
