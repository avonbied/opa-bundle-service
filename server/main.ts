import http from "node:http";
import { URL } from "node:url";
import { getBundle } from "./getBundle";

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
	const REQ_URL = new URL(`${FULL_URL}${request.url}`);
	console.log(`${request.method} HTTP/${request.httpVersion} ${request.url}`);
	console.log(request.headers);

	if (REQ_URL.pathname.startsWith(CONFIG.bundleRoot)) {
		console.log("File Request")
		const FILE = await getBundle(REQ_URL.pathname);
		const STATUS = FILE.found ? 200 : 404;
		result.writeHead(STATUS, {
			"etag": "1.0.0",
			"Content-Type": MIME_TYPES.gzip
		});
		FILE.stream?.pipe(result);
	} else if (REQ_URL.pathname.startsWith(CONFIG.refreshRoot)) {
		console.log("Refresh Request")
		result.writeHead(500)
	} else {
		console.log("Bad Request")
		result.writeHead(400)
	}
	console.log("End Request")
}).listen(CONFIG.port);

console.log(`Server running at ${FULL_URL}`);