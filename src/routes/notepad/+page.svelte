<script lang="ts">
	import CodeMirror from '../../components/CodeMirror.svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { onMount } from 'svelte';
	import _ from 'lodash';

	let store: CodeMirror['docStore'];

	let note: string;
	// let note = '';
	onMount(async () => {
		const response = await fetch('/api/notepad/read', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		const result = await response.json();
		note = result.content;
	});

	const writeData = _.throttle(async (content: string) => {
		await fetch('/api/notepad/write', {
			method: 'POST',
			body: JSON.stringify({ content })
		});
	}, 150);

	const myTheme = EditorView.theme({
		'.cm-editor': { minHeight: '600px' },
		'.cm-gutter,.cm-content': { minHeight: '600px' },
		'.cm-scroller': { overflow: 'auto' }
	});

	async function changeHandler({ detail: { tr } }) {
		const content = tr.newDoc.toString();

		await writeData(content);
	}
</script>

<div class="h-[100%]">
	<CodeMirror
		doc={note}
		bind:docStore={store}
		extensions={[basicSetup, markdown(), myTheme]}
		on:change={changeHandler}
	/>
</div>

<style>
	:global(.codemirror) {
		border: 1px solid #ddd;
	}
</style>
