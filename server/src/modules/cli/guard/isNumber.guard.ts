export function isNumber(x: number): x is number {
	return typeof x == "number" && x > 0
}