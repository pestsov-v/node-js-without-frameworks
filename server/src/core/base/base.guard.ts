import { strOrUndef } from "./union.type"

export function isCheks(x: object): x is object {
	return typeof x == "object" && x instanceof Array
}

export function isProtocol(x: string): x is string {
	return typeof x == "string" && ["https", "http"].indexOf(x) > -1
} 

export function isString(x: string): x is string {
	return typeof x == "string" && x.trim().length > 0
}

export function isMethod(x: string): x is string {
	return typeof x == "string" && ["post", "get", "put", "delete"].indexOf(x) > -1
}

export function isCode(x: object): x is object {
	return typeof x == "object" && x instanceof Array && x.length > 0
}

export function isTime(x: number): x is number {
	return typeof x == "number" && x % 1 === 0 && x >= 1 && x <= 5
}

export function isId(x: string): x is string {
	return typeof x == "string" && x.trim().length == 20
}

export function isBoolean(x: boolean): x is boolean {
	return typeof x == "boolean" && x == true 
}


export function isNumber(x: number): x is number {
	return typeof x == "number" && x > 0
}

export function isStringUndef(x: strOrUndef): x is string {
	return typeof x === 'string'
}