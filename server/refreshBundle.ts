import { exec } from "node:child_process";

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