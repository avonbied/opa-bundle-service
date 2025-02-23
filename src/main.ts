import http from "node:http";
import { URL } from "node:url";
import { getBundle } from "./retrieveBundle";

const CONFIG = {
	bundleRoot: `${process.env.BUNDLE_PATH ?? '/bundles'}`,
	refreshRoot: `${process.env.REFRESH_PATH ?? '/refresh'}`,
	port: process.env.PORT ?? 9090
}

const FULL_URL = `http://${process.env.HOST ?? 'localhost'}:${CONFIG.port}`;
const MIME_TYPES = {
	gzip: "application/gzip",
	// Future Long-Poll Support
	opa: "application/vnd.openpolicyagent.bundles"
};

http.createServer(async (request, result) => {
	const REQ_URL = new URL(`${FULL_URL}/${request.url}`);

	if (REQ_URL.pathname.startsWith(CONFIG.bundleRoot)) {
		const FILE = await getBundle(REQ_URL.pathname);
		const STATUS = FILE.found ? 200 : 404;

		result.writeHead(STATUS, { "Content-Type": MIME_TYPES.gzip });
		FILE.stream?.pipe(result);
		console.log(`${request.method} ${request.url} ${STATUS}`);

	} else if (REQ_URL.pathname.startsWith(CONFIG.refreshRoot)) {
		result.writeHead(500)
	}
	result.writeHead(400)
}).listen(CONFIG.port);

console.log(`Server running at ${FULL_URL}`);