export type strOrBool = string | boolean
export type strOrUndef = string | undefined


export function isStringUndef(x: strOrUndef): x is string {
	return typeof x === 'string'
}