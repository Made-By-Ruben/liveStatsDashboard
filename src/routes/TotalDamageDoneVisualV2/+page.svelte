<script lang="ts">
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
<div
	class="min-h-screen w-full flex-col p-6"
	style="background: repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(255,255,255,0.02) 19px), linear-gradient(160deg, #0c38a5 0%, #092660 55%, #0c0c0c 100%);"
>
	<!-- Graph Head to Head -->
	<div class="flex w-full justify-between gap-4">
		<TeamChart team={team1} teamIndex={0} {maxDamage} />
		<TeamChart team={team2} teamIndex={1} {maxDamage} />
	</div>

	<!-- Graph Legend -->
	<div
		class="mt-6 flex w-full items-center justify-center gap-8"
		style="font-family: var(--font-label);"
	>
		<span class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-off-white">
			<span class="inline-block h-3 w-3 bg-lime"></span>
			PHYSICAL
		</span>
		<span class="text-off-white/30 text-xs">/</span>
		<span class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-off-white">
			<span class="inline-block h-3 w-3 bg-brand-blue"></span>
			MAGIC
		</span>
		<span class="text-off-white/30 text-xs">/</span>
		<span class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-off-white">
			<span class="inline-block h-3 w-3 border border-off-white"></span>
			TRUE
		</span>
	</div>
</div>
