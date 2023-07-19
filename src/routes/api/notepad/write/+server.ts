import * as fs from 'node:fs/promises'
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { content } = await request.json();

	const file = '/home/edwin/.local/share/wo/app-notepad-content.txt'

	await fs.writeFile(file, content)

	return json({})
}
