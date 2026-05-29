<script lang="ts">
	import TotalDamageDone from './TotalDamageDone.svelte';
	import { fade } from 'svelte/transition';
	import SpotlightVisual from '../SpotlightVisual.svelte';
	import SocialsVisual from './SocialsVisual.svelte';
	import type { ActiveVisual } from '$lib/activeVisual.svelte';

	let { visual, visualStyle }: { visual: ActiveVisual | undefined, visualStyle: string | undefined } = $props();
</script>

<div class="h-full w-full" in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
	{#if visual?.status === 'success'}
		{#if visual.visualType === 'customVisuals'}
			<SpotlightVisual data={visual.data.data} />
		{:else}
			<TotalDamageDone data={visual.data.data} />
		{/if}
	{:else if visual?.status === 'error'}
		<SocialsVisual {visualStyle} />
	{/if}
</div>
