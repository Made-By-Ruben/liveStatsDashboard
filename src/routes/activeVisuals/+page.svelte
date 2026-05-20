<script lang="ts">
	import TotalDamageVisual from '$lib/components/visuals/TotalDamageVisual.svelte';

	let selectedVisual = $state<null | 'totalDamageDone'>(null);
</script>

<main class="relative h-270 w-480">
	<div
		class="mainContainer absolute bottom-0 left-75.5 flex h-62.5 w-334.5 flex-col border border-border-blue bg-transparent"
	>
		{#if selectedVisual === 'totalDamageDone'}
			<TotalDamageVisual />
		{/if}
	</div>
</main>



