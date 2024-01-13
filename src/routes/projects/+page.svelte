<script lang="ts">
	import { onMount } from 'svelte'
	import {
		createColumnHelper,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
	} from '@tanstack/svelte-table'
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table'
	import { writable } from 'svelte/store'
	import OpenButton from '../../components/OpenButton.svelte'
	import TrueFalse from '../../components/TrueFalse.svelte'

	/** @type {import('./$types').PageData} */
	export let data

	let search = ''
	type Project = {
		dir: string
		name: string
		category: string
		project: {
			hasFoxxoConfig: boolean
			isGitDir: boolean
		}
		hasFoxxoConfig: boolean
		isGitDir: boolean
	}
	let backupProjects: Project[] = []
	let actualProjects: Project[] = []
	async function changedSearch() {
		const response = await fetch('/api/projects/list', {
			method: 'POST',
		})
		const body = await response.json()
		backupProjects = Array.from(body.matches)
		if (search) {
			actualProjects = backupProjects.filter((project) => {
				return project.name.includes(search)
			})
		} else {
			actualProjects = backupProjects
		}
		rerender()
	}

	let activeTab = ''
	let tabs = []
	let table
	let defaultColumns: ColumnDef<Project>[]
	let options
	onMount(async () => {
		tabs = Array.from(
			new Set(data.configJson.repositoryCategories.map((item) => item.category)).values(),
		).map((item) => ({
			name: item,
		}))
		activeTab = tabs[0].name

		const response = await fetch('/api/projects/list', {
			method: 'POST',
		})
		const body = await response.json()
		backupProjects = Array.from(body.matches)
		actualProjects = body.matches
		let defaultData = actualProjects

		const columnHelper = createColumnHelper<Project>()
		defaultColumns = [
			columnHelper.accessor('name', {
				header: () => 'Name',
				cell: (info) => info.getValue(),
				footer: (info) => 'Name',
			}),
			columnHelper.display({
				id: 'foxxo',
				header: () => 'Foxxo',
				cell: (info) => flexRender(TrueFalse, { text: info.row.original.hasFoxxoConfig }),
				footer: (info) => 'Foxxo',
			}),
			columnHelper.accessor('tags', {
				header: () => 'Tags',
				cell: (info) => info.getValue(),
				footer: (info) => 'Tags',
			}),
			columnHelper.accessor('isGitDir', {
				header: () => 'Git Directory',
				cell: (info) => flexRender(TrueFalse, { text: info.row.original.isGitDir }),
				footer: (info) => 'Git Directory',
			}),
			columnHelper.display({
				id: 'open',
				cell: (info) => flexRender(OpenButton, { dir: info.row.original.dir }),
			}),
		]

		options = writable<TableOptions<Project>>({
			data: defaultData,
			columns: defaultColumns,
			getCoreRowModel: getCoreRowModel(),
		})

		table = createSvelteTable(options)
	})
	const rerender = () => {
		options.update((options) => ({
			...options,
			data: actualProjects,
		}))
	}
</script>

<h1 class="text-3xl font-bold">Projects</h1>
<div class="form-control w-full max-w-xs">
	<label class="label">
		<input
			class="input input-bordered input-accent"
			on:input={changedSearch}
			bind:value={search}
		/>
		<span class="label-text ml-1 font-bold">Search</span>
	</label>
</div>
<button on:click={() => rerender()} class="mb-1 btn btn-primary"> Rerender </button>

<div role="tablist" class="tabs tabs-lifted">
	{#each tabs as tab, i}
		<input
			type="radio"
			name="projects_tabs"
			role="tab"
			class="tab"
			checked
			class:active-tab={activeTab === tab.name ? 'active-tab' : ''}
			aria-label={tab.name}
		/>
		<div
			role="tabpanel"
			tabindex={i}
			class="tab-content bg-base-100 border-base-300 rounded-box p-6"
		>
			{#if table}
				<table class="table table-zebra">
					<thead>
						{#each $table.getHeaderGroups() as headerGroup}
							<tr>
								{#each headerGroup.headers as header}
									<th>
										{#if !header.isPlaceholder}
											<svelte:component
												this={flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											/>
										{/if}
									</th>
								{/each}
							</tr>
						{/each}
					</thead>
					<tbody>
						{#each $table.getRowModel().rows as row}
							<tr>
								{#each row.getVisibleCells() as cell}
									{#if cell.row.original.category === tab.name}
										<td>
											<svelte:component
												this={flexRender(cell.column.columnDef.cell, cell.getContext())}
											/>
										</td>
									{/if}
								{/each}
							</tr>
						{/each}
					</tbody>
					<tfoot>
						{#each $table.getFooterGroups() as footerGroup}
							<tr>
								{#each footerGroup.headers as header}
									<th>
										{#if !header.isPlaceholder}
											<svelte:component
												this={flexRender(
													header.column.columnDef.footer,
													header.getContext(),
												)}
											/>
										{/if}
									</th>
								{/each}
							</tr>
						{/each}
					</tfoot>
				</table>
			{/if}
		</div>
	{/each}
</div>
