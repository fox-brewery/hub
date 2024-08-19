<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let timeout: NodeJS.Timeout;
	onMount(() => {
		setClock();
		timeout = setInterval(setClock, 1000);
	});
	onDestroy(() => {
			clearInterval(timeout);
	});

	function setClock() {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const time = document.querySelector('.time');
		const s = (n: number) => n < 10 ? `0${n}` : n;
		if (time) {
			time.textContent = `${s(hours)}:${s(minutes)}:${s(seconds)}`;
			console.log(time.textContent)
		}

	}

	const items = [
		{
			title: 'Services',
			link: '/services',
		},
		{
			title: 'Repositories',
			link: '/repositories',
		},
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

	]
</script>

<div class="p-1 main">
	<div class="mb-2 mr-4 flex items-center justify-between flex-wrap">
		<h1 class="text-7xl font-bold">Welcome, Edwin</h1>
		<p class="time text-7xl font-mono"></p>
	</div>
	<div class="flex flex-wrap gap-2">
		{#each items as item}
			<a href={item.link}>
				<span
					class="w-48 h-48 bg-slate-200 border-slate-400 border rounded-md flex items-center justify-center text-2xl hover:bg-slate-300 hover:cursor-pointer"
				>
					{item.title}
				</span>
			</a>
		{/each}
	</div>
</div>

<style>
.main {
	background: linear-gradient(135deg, #FFACD7, #D08FFF);
	background-size: 400% 400%;
	animation: AnimationName 20s ease infinite;
	height: 100%;
}

@keyframes AnimationName {
	0%{background-position:0% 43%}
	50%{background-position:100% 58%}
	100%{background-position:0% 43%}
}
</style>
