export async function load({ fetch }) {
	const res = await fetch('/api/projects/list')
	// const body = await res.json()

	// this becomes available on the page as `data.posts`
	return {}
}
