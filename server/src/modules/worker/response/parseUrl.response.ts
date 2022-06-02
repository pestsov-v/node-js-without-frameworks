export interface IParseUrl {
	protocol: string | null;
	slashes: boolean | null;
	auth: string | null;
	host: string | null;
	port: string | null;
	hostname: string | null;
	hash: string | null;
	search: string | null;
	query: unknown;
	pathname: string | null;
	path: string | null;
	href: string | null;
}