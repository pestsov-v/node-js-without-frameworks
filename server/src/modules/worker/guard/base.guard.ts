import { method } from "../../../core/base/method.enum"
import { strOrBool } from "../type/base.type"

export function isId(x: strOrBool): x is string {
	return typeof x == "string" && x.trim().length == 20
}

export function isPhone(x: strOrBool): x is string {
	return typeof x == "string" && x.trim().length == 10
}

export function isUrl(x: strOrBool): x is string {
	return typeof x == "string" && x.trim().length > 0
}

export function isMethod(x: strOrBool): x is string {
	return typeof x == "string" && ["post", "get", "put", "delete"].indexOf(x as keyof typeof method) > -1
}

export function isProtocol(x: strOrBool): x is string {
	return typeof x == "string" && ["http", "https"].indexOf(x) > -1
}

export function isTime(x: number | boolean): x is number {
	return typeof x == "number" && x % 1 === 0 && x >= 1 && x <= 5
}

export function isLastChecked(x: number | boolean): x is number {
	return typeof x == "number" && x > 0
}

export function isState(x: string): x is string {
	return typeof x == "string" && ["up", "down"].indexOf(x) > -1
}

