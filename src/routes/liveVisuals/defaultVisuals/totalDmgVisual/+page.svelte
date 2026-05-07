<script lang="ts">
	import type { PageProps } from './$types';
	import GraphLegend from '$lib/components/GraphLegend.svelte';
	import TeamChart from '$lib/components/TeamChart.svelte';
	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	let { data }: PageProps = $props();
	let team1 = $derived(data.team1) as TeamStats;
	let team2 = $derived(data.team2) as TeamStats;
	let maxDamage = $derived(data.maxDamage);
</script>

<!-- TODO: In order to improve re-usability, the response needs to possess some meta data about the stat
	 That way, this data can be used to create the legend of the graph 
-->
<!-- Main Container -->
<div class="flex h-[90%] w-full justify-between p-2">
	<TeamChart team={team1} teamIndex={0} {maxDamage} />
	<TeamChart team={team2} teamIndex={1} {maxDamage} />
</div>

<!-- Add meta data here -->
<GraphLegend stats={['Physical Damage', 'Magic Damage', 'True Damage']} />
