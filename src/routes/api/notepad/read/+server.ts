import * as fs from 'node:fs/promises'
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const file = '/home/edwin/.local/share/wo/app-notepad-content.txt'

	const content = await fs.readFile(file, 'utf-8')

	return json({
		content
	})
}
