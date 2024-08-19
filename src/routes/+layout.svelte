<script>
	import '../app.css'
</script>

<div class="grid grid-rows-[auto_auto_1fr] h-full">
	<a class="m-1 text-blue-600 visited:text-purple-600 hover:underline" href="/">Back</a>
	<div class="bg-slate-700 h-[1px]" />
	<div class="h-full">
		<slot />
	</div>
</div>
