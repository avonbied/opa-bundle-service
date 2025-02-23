import fs from "node:fs";
import path from "node:path";

const toBool = [() => true, () => false];

export interface BundleResult {
	found: boolean;
	stream?: fs.ReadStream;
}

export async function getBundle(url): Promise<BundleResult> {
	const FILE_PATH = path.join(...[
		url,
		`${url.endsWith("/") ? "bundle.tar.gz" : ''}`
	]);
	if (await fs.promises.access(FILE_PATH).then(...toBool)) {
		const stream = fs.createReadStream(FILE_PATH);
		return { found: true, stream }
	}
	return { found: false };
};