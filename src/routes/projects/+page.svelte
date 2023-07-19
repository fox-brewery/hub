<script lang="ts">
	import { onMount } from 'svelte'

	let search = ''
	let projects: {
		dir: string
		name: string
		tags: string[]
	}[] = []
	onMount(async () => {
		const response = await fetch('/api/projects/list', {
			method: 'POST',
		})
		const body = await response.json()
		projects = body.matches
	})

	async function openProject(dirpath: string) {
		await fetch('/api/projects/open', {
			method: 'POST',
			body: JSON.stringify({ path: dirpath }),
		})
	}
</script>

<h1>Projects</h1>
<div class="form-control w-full max-w-xs">
	<label class="label" for="search">
		<span class="label-text">Search filter</span>
	</label>
	<input class="input input-bordered input-accent" id="search" bind:value={search} />
</div>

<table class="table table-zebra">
	<thead>
		<tr>
			<th>Name</th>
			<th>Open</th>
		</tr>
	</thead>
	<tbody>
		{#each projects as project}
			{#if project.dir.toLowerCase().includes(search) || project.tags.some((tag) => tag
						.toLowerCase()
						.includes(search))}
				<tr>
					<th class="text-lg">{project.name}</th>
					<td
						><button
							class="btn btn-primary btn-sm active:scale-105"
							on:click={openProject(project.dir)}>Open</button
						></td
					>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
