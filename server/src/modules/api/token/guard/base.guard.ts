export function isString(x: string): x is string {
	return typeof x == "string" && x.trim().length > 0
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