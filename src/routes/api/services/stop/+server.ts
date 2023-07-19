import * as util from 'node:util';
import * as fs from 'node:fs/promises';
import * as child_process from 'node:child_process';
import { json } from '@sveltejs/kit';

const exec = util.promisify(child_process.exec);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name } = await request.json();

	await exec(`systemctl --user stop ${name}`);

	return json({});
}
