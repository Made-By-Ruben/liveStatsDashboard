<script lang="ts">
	let { callback, text, isCTA } = $props();
</script>

{#if isCTA}
	<button
		onclick={callback}
		class="cursor-pointer rounded border-brand-highlight-1/20 bg-brand-highlight-1 px-4 py-1 text-center font-label text-2xl font-bold text-brand-dark-1"
	>
		Next Step
	</button>
{:else}
	<button
		onclick={callback}
		class="cursor-pointer rounded border border-brand-highlight-1 px-4 py-1 text-center font-label text-2xl font-bold text-brand-off-white"
	>
		{text}
	</button>
{/if}
