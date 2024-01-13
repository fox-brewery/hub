export async function load({ fetch }) {
	const configFile = await fetch('/api/config/get', {
		method: 'POST',
	})
	const configJson = JSON.parse(await configFile.text())

	// const res = await fetch('/api/projects/list', {
	// 	method: 'POST'
	// })
	// const body = await res.json()

	return {
		configJson
	}
}
