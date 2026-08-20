<script lang="ts">
	import TotalDamageDone from './TotalDamageDone.svelte';
	import { fade } from 'svelte/transition';
	import SpotlightVisual from './SpotlightVisual.svelte';
	import SocialsVisual from './SocialsVisual.svelte';
	import type { ActiveVisual } from '$lib/activeVisual.svelte';
	import PostGameVisual from './PostGameVisual.svelte';

	let {
		visual,
		visualStyle
	}: { visual: ActiveVisual | undefined; visualStyle: string | undefined } = $props();
</script>

<div class="h-full w-full" in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
	{#if visual?.status === 'success'}
		{#if visual.visualType === 'customVisuals'}
			<SpotlightVisual data={visual.data.data} {visualStyle} />
		{:else if visual.visualType === 'postGameVisuals'}
			<PostGameVisual data={visual.data} {visualStyle} />
		{:else}
			<TotalDamageDone data={visual.data.data} isPostGame={false} />
		{/if}
	{:else if visual?.status === 'error'}
		<SocialsVisual {visualStyle} />
	{/if}
</div>
