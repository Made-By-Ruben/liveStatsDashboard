<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

	let activeVisual = $state<null | "totalDmgVisual" | "customVisual">(null)
</script>

<main class="relative h-270 w-480">
	<div
		class="mainContainer absolute bottom-0 left-75.5 flex h-62.5 w-334.5 flex-col border border-border-blue bg-transparent"
	>
		{#if activeVisual === 'totalDmgVisual'}
			
		{/if}

	</div>
</main>