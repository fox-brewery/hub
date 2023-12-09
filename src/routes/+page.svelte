<script>
	const items = [
		{
			title: 'Keybindings',
			link: '/keybindings',
		},
		{
			title: 'Notepad',
			link: '/notepad',
		},
		{
			title: 'Projects',
			link: '/projects',
		},
		{
			title: 'VSCode Profiles',
			link: '/vscode-profiles',
		},
		{
			title: 'Services',
			link: '/services',
		},
	]
</script>

<div class="flex flex-wrap gap-2 m-2">
	{#each items as item}
		<a href={item.link}>
			<span
				class="w-48 h-48 inline-block bg-slate-200 rounded-md flex items-center justify-center text-2xl hover:bg-slate-300 hover:cursor-pointer"
			>
				{item.title}
			</span>
		</a>
	{/each}
</div>
