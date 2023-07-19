import * as util from 'node:util';
import * as fs from 'node:fs/promises';
import * as child_process from 'node:child_process';
import { json } from '@sveltejs/kit';

const exec = util.promisify(child_process.exec);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name } = await request.json();

	if (name === 'Mgr') {
		await exec(
			`systemd-run --user --collect --setenv=PATH="/home/edwin/.local/state/woof/tools/core/nodejs/v20.4.0/bin:$PATH" --working-directory="/storage/ur/storage_home/Docs/Programming/Repositories/mgr/mgr" --unit 'Mgr' pnpm start`
		);
	}

	return json({});
}
