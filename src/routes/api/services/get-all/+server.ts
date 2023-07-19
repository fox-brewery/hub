import * as util from 'node:util';
import * as fs from 'node:fs/promises';
import * as child_process from 'node:child_process';
import { json } from '@sveltejs/kit';

const exec = util.promisify(child_process.exec);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let services = ['Mgr'];

	const serviceDataPromises = services.map((service) => {
		return new Promise((resolve, reject) => {
			try {
				let stdout = '';
				let stderr = '';
				let exitCode = null;

				const child = child_process.exec('systemctl --user status Mgr.service', (err) => {
					if (err) {
						return resolve({
							serviceName: service,
							info: stderr,
							exitCode
						});
					}

					resolve({
						serviceName: service,
						info: stdout,
						exitCode
					});
				});

				child.stdout?.on('data', (data) => {
					stdout += data;
				});
				child.stderr?.on('data', (data) => {
					stderr += data;
				});
				child.on('exit', (code) => {
					exitCode = code;
				});
			} catch (err) {
				resolve({
					serviceName: service,
					info: stderr,
					exitCode: data.exitCode
				});
			}
		});
	});
	const serviceData = await Promise.all(serviceDataPromises);

	return json({ services: serviceData });
}
