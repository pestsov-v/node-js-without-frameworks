export interface IGetDetails {
	protocol: string | null;
	hostname: string | null;
	method: string;
	path: string | null;
	timeout: number | null;
}