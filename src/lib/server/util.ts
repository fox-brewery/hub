import * as path from 'node:path'

export function projectDir() {
	return path.basename(process.cwd()) === 'build'
			? path.resolve('..')
			: path.resolve('.')

}
