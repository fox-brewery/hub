import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { text } from '@sveltejs/kit'
import * as jsoncParser from 'jsonc-parser'
import { projectDir } from '$lib/server/util.js'

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	const file = path.join(projectDir(), 'config/hub.jsonc')
	const json = jsoncParser.parse(await fs.readFile(file, 'utf-8'))
	const content = JSON.stringify(json, null, '\t')

	return text(content)
}
