import { exec } from "node:child_process";
import fs from "node:fs";

export async function refreshDiscovery() {
	exec('which opa', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.error(`stderr: ${stderr}`)
	})
}