<script lang="ts">
	import { SseConnection } from '$lib/sseStream.svelte';
	import { onDestroy, onMount } from 'svelte';
	import TeamChart from '../TeamChart.svelte';
	import GraphLegend from '../GraphLegend.svelte';
	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	type Payload = { 100: TeamStats; 200: TeamStats; maxDamage: number };

	let stream = $state<SseConnection<Payload>>();

	onMount(() => {
		stream = new SseConnection<Payload>(
			'http://localhost:3000/defaultVisuals/stream/TOTAL_DAMAGE_DONE_H2H/311'
		);
	});

	onDestroy(() => {
		stream?.close()
	})
</script>

{#if stream === undefined || stream.status === 'connecting'}
	<div class="flex h-[90%] w-full justify-between p-2">
		<h1 class="self-center text-2xl text-off-white">Connecting...</h1>
	</div>
{:else if stream.data}
	<div class="flex h-[90%] w-full justify-between p-2">
		<TeamChart team={stream.data[100]} teamIndex={0} maxDamage={stream.data.maxDamage} />
		<TeamChart team={stream.data[200]} teamIndex={1} maxDamage={stream.data.maxDamage} />
	</div>
{/if}

<GraphLegend stats={['Physical Damage', 'Magic Damage', 'True Damage']} />
