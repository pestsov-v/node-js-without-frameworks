export type strOrBool = string | boolean

export function isString(x: strOrBool): x is string {
	return typeof x === 'string' && x.trim().length > 0
}