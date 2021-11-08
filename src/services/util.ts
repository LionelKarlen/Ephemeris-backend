import { AnyError } from "mongodb";

export function handleRequestError(err: AnyError, res: any) {
	res.status(500);
	res.end();
	console.error("Caught exception", err);
}
