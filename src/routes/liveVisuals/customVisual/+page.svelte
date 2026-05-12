<script lang="ts">
	import SpotlightVisual from '$lib/components/SpotlightVisual.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const statEntries = $derived(Object.entries(data.spotlightedPlayer.filteredStats));
	$inspect(statEntries)
</script>

<SpotlightVisual
	champName={data.spotlightedPlayer.championName}
	role={data.spotlightedPlayer.role}
	playerName={data.spotlightedPlayer.playerName}
	{statEntries}
/>
