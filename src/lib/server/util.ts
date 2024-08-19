import * as path from 'node:path'
import * as os from 'node:os'

export function projectDir() {
	return path.basename(process.cwd()) === 'build' ? path.resolve('..') : path.resolve('.')
}

export function dataDir() {
	return path.join(os.homedir(), '.core/data')
}
