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