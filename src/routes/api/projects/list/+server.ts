import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { json } from '@sveltejs/kit'
import { glob } from 'glob'
import * as jsoncParser from 'jsonc-parser'
import { projectDir } from '$lib/server/util.js'

type HubJson = {
	repositoryRoot: string
	repositoryCategories: {
		category: string
		dir: string
	}[]
}

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	const hubFile = path.join(projectDir(), 'config/hub.jsonc')

	const hubJson: HubJson = jsoncParser.parse(await fs.readFile(hubFile, 'utf-8'))
	const allMatches: {
		dir: string
		name: string
		category: string
		project: {
			hasFoxxoConfig: boolean
			isGitDir: boolean
		}
		hasFoxxoConfig: boolean
		isGitDir: boolean
	}[] = []

	for (const entry of hubJson.repositoryCategories) {
		const matches = await glob(hubJson.repositoryRoot + entry.dir)
		for (const match of matches) {
			const hasGitDir = await fs
				.stat(path.join(match, '.git'))
				.then(() => true)
				.catch(() => false)

			const hasFoxxoConfig = await fs
				.stat(path.join(match, 'foxxo.toml'))
				.then(() => true)
				.catch(() => false)

			allMatches.push({
				dir: match,
				name:
					entry.level === 1
						? path.basename(match)
						: path.basename(path.dirname(match)) + '/' + path.basename(match),
				category: entry.category,
				project: {
					hasFoxxoConfig,
					isGitDir: hasGitDir,
				},
				hasFoxxoConfig,
				isGitDir: hasGitDir,
			})
		}
	}

	return json({ matches: allMatches })
}
