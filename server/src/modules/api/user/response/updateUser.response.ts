import { statusCode } from "../../../../core/base/enum/statusCode.enum"

export interface IUpdateUserResponse {
	statusCode: statusCode,
	message: string,
}
