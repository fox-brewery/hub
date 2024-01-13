import * as fs from 'node:fs/promises'
import { error, json } from '@sveltejs/kit';
import path from 'node:path';
import { projectDir } from '$lib/server/util.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const file = path.join(projectDir(), '.hidden/notepad.txt')

	const content = await fs.readFile(file, 'utf-8')

	return json({
		content
	})
}
