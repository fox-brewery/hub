<script lang="ts">
	export let text: boolean
</script>

{#if text}
	<p class="text-green-700 font-bold">TRUE</p>
{:else}
	<p class="text-red-700 font-bold">FALSE</p>
{/if}
