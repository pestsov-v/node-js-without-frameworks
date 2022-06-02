export function isCode(x: object | false): x is object {
	return typeof x == "object" && x instanceof Array && x.length > 0
}


export function isData(x: object | null): x is object {
	return typeof x == "object" && x !== null
}