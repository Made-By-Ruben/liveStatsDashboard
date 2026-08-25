<script lang="ts">
	import type { ActiveVisual } from '$lib/activeVisual.svelte';
	import { fade } from 'svelte/transition';
	import TotalDamageDone from './totalDmgVisual/TotalDamageDone.svelte';
	import PostGameVisual from './postGameVisuals/PostGameVisual.svelte';
	import SocialsVisual from './SocialsVisual.svelte';
	import SpotlightVisual from './SpotlightVisual.svelte';

	let {
		visual,
		visualStyle,
		onFadedOut
	}: { visual: ActiveVisual | undefined; visualStyle: string | undefined; onFadedOut: () => void } =
		$props();
</script>

<div
	class="h-full w-full"
	onoutroend={(ev) => {
		onFadedOut();
	}}
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 100 }}
>
	{#if visual?.status === 'success'}
		{#if visual.visualType === 'customVisuals'}
			<SpotlightVisual data={visual.data.data} {visualStyle} />
		{:else if visual.visualType === 'postGameVisuals'}
			<PostGameVisual data={visual.data} {visualStyle} />
		{:else}
			<TotalDamageDone data={visual.data.data} isPostGame={false} team100Won={null} />
		{/if}
	{:else if visual?.status === 'error'}
		<SocialsVisual {visualStyle} />
	{/if}
</div>
