<script lang="ts">
	export let dir: string

	async function openProject(dirpath: string) {
		await fetch('/api/projects/open', {
			method: 'POST',
			body: JSON.stringify({ path: dirpath }),
		})
	}
</script>

<button class="btn btn-primary btn-sm active:scale-105" on:click={openProject(dir)}
	>Open</button
>
