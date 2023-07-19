import * as util from 'node:util'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { json } from '@sveltejs/kit'
import { glob } from 'glob'
import * as child_process from 'node:child_process'

const exec = util.promisify(child_process.exec)

type HubJson = {
	repositoryRoot: string
	repositoryDirectories: {
		dir: string
		tags: string[]
	}[]
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { path } = await request.json()

	await exec(`code "${path}"`)

	return json({})
}
