import * as fs from 'node:fs/promises'
import { json } from '@sveltejs/kit'
import path from 'node:path'
import { dataDir } from '$lib/server/util.js'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { content } = await request.json()

	const file = path.join(dataDir(), 'notepad.txt')

	await fs.mkdir(path.dirname(file), { recursive: true })
	await fs.writeFile(file, content)

	return json({})
}
