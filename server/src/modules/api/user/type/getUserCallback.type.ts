import { statusCode } from "../../../../core/base/enum/statusCode.enum"
import { IGetUserResponse } from "../response/getUser.response"

type data = {
	firstName: string,
	lastName: string,
	phone: string,
	tosAggrement: boolean,
}

export interface IGetUserCallback {
	(statusCode: statusCode, data: data): data
}