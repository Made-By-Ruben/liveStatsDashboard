<script lang="ts">
	import { calcPercentage } from '$lib/utils/calcPercentage';
	import type { PageProps } from './$types';
	import TeamChart from './components/TeamChart.svelte';
	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	let { data }: PageProps = $props();

	let team1 = $derived(data.team1) as TeamStats;
	let team2 = $derived(data.team2) as TeamStats;
	let maxDamage = $derived(data.maxDamage);
</script>

<!-- Main Container -->
<div class="w-full flex-col bg-blue-950">
	<!-- Graph Head to Head -->
	<div class="flex w-full justify-between">
		<!-- Team 1 -->
		<TeamChart team={team1} teamIndex={0} {maxDamage} />

		<TeamChart team={team2} teamIndex={1} {maxDamage} />
	</div>

	<!-- Graph Legend -->

	<div class="flex w-full items-center justify-center gap-2 p-2 font-bold text-white">
		<h1>🪓PHYSICAL DAMAGE</h1>
		<h1>💫MAGIC DAMAGE</h1>
		<h1>⬜TRUE DAMAGE</h1>
	</div>
</div>
