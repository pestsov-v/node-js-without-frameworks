export function isString(x: string): x is string {
	return typeof x == "string" && x.trim().length > 0
}

export function isId(x: string): x is string {
	return typeof x == "string" && x.trim().length == 20
}

export function isBoolean(x: boolean): x is boolean {
	return typeof x == "boolean" && x == true 
}