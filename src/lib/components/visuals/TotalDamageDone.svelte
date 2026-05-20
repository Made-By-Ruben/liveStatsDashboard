<script lang="ts">
	import GraphLegend from '../GraphLegend.svelte';
	import TeamChart from '../TeamChart.svelte';

	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	// TODO: pass through a generic for the payload type format based on the visual
	type Payload = { 100: TeamStats; 200: TeamStats; maxDamage: number };

	let { data }: { data: Payload } = $props();
</script>

<div class="flex h-[90%] w-full justify-between p-2">
	<TeamChart team={data[100]} teamIndex={0} maxDamage={data.maxDamage} />
	<TeamChart team={data[200]} teamIndex={1} maxDamage={data.maxDamage} />
</div>
<GraphLegend stats={['Physical Damage', 'Magic Damage', 'True Damage']} />
