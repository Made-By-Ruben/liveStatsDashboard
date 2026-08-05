<script lang="ts">
	import { fade } from 'svelte/transition';

	type propTypes = {
		editVisual: boolean;
		onExportConfig(): void;
		onCloseVisual(): void;
	}

	let { editVisual, onExportConfig, onCloseVisual }: propTypes = $props();
</script>

<div class="flex h-[10%] w-full items-center justify-between text-brand-off-white">
	<div>
		<h1 class="font-heading text-5xl">{editVisual ? 'Editing' : 'Your Visuals'}</h1>
		<h2 class="font-label text-2xl italic">
			{editVisual ? 'Configure this visual' : '10 configured visuals - click any one to edit it'}
		</h2>
	</div>
	{#if !editVisual}
		<button in:fade={{ duration: 200 }} class="ctaButton" onclick={onExportConfig}
			>Export Bitfocus Configuration</button
		>
	{:else}
		<button in:fade={{ duration: 200 }} class="ctaButton" onclick={onCloseVisual}
			>Back to overview</button
		>
	{/if}
</div>
