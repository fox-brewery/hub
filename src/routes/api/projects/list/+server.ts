import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { json } from '@sveltejs/kit'
import { glob } from 'glob'

type HubJson = {
	repositoryRoot: string
	repositoryDirectories: {
		dir: string
		tags: string[]
	}[]
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const hubFile = 'hub.json'
	const hubJson: HubJson = JSON.parse(await fs.readFile(hubFile, 'utf-8'))

	let allMatches: {
		dir: string
		name: string
		tags: string[]
	}[] = []
	for (const dir of hubJson.repositoryDirectories) {
		const fulldir = hubJson.repositoryRoot + dir.dir

		const matches = await glob(fulldir)
		allMatches = allMatches.concat(
			matches.map((match) => ({ dir: match, name: path.basename(match), tags: dir.tags })),
		)
	}

	return json({ matches: allMatches })
}
