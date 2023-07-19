<script lang="ts">
	import { onMount } from 'svelte';

	let currentService = 0;
	let items: {
		serviceName: string;
		info: string;
		exitCode: number;
	}[] = [];

	async function refreshServices() {
		const res = await fetch('/api/services/get-all', {
			method: 'POST'
		});
		const { services } = await res.json();

		if (Array.isArray(services)) {
			items = services;
		}
	}

	async function serviceStop() {
		await fetch('/api/services/stop', {
			method: 'POST',
			body: JSON.stringify({ name: items[currentService].serviceName })
		});
		await refreshServices();
	}

	async function serviceStart() {
		await fetch('/api/services/start', {
			method: 'POST',
			body: JSON.stringify({ name: items[currentService].serviceName })
		});
		await refreshServices();
	}

	onMount(async () => {
		await refreshServices();
	});
</script>

<table class="table-auto table table-zebra">
	<thead>
		<tr>
			<th>Unit</th>
			<th>Status</th>
			<th>Show</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item, i}
			<tr>
				<td>{item.serviceName}</td>
				<td>{item.exitCode === 0 ? 'Success' : 'FAILURE'}</td>
				<td
					><button
						on:click={() => (currentService = i)}
						class="btn btn-xs hover:scale-[1.05] active:btn-primary">Show</button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
<h2 class="text-xl">Output</h2>
{#if items.length > 0}
	<pre>{items[currentService].info}</pre>
{/if}
<button on:click={serviceStop} class="btn btn-warning btn-sm">Stop</button>
<button on:click={serviceStart} class="btn btn-success btn-sm">Start</button>
