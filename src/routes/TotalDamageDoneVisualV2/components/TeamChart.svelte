<script lang="ts">
	import { calcPercentage } from '$lib/utils/calcPercentage';
	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;
	let { team, teamIndex, maxDamage }: { team: TeamStats; teamIndex: number; maxDamage: number } =
		$props();
</script>

<div class="w-1/2">
	{#each Object.entries(team) as [player, stats]}
		{@const barWidth = calcPercentage(stats['TOTAL_DAMAGE_DEALT_TO_CHAMPIONS'], maxDamage)}
		{@const physicalDmgPercentage = calcPercentage(
			stats['PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS'],
			stats['TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']
		)}
		{@const magicalDmgPercentage = calcPercentage(
			stats['MAGIC_DAMAGE_DEALT_TO_CHAMPIONS'],
			stats['TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']
		)}
		{@const trueDmgPercentage = calcPercentage(
			stats['TRUE_DAMAGE_DEALT_TO_CHAMPIONS'],
			stats['TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']
		)}
		<!-- Graph Row -->
		<div class="m-2 flex {teamIndex === 1 ? 'flex-row-reverse' : ''} w-full items-center gap-2">
			<img class="size-10" src="./champion/{player}.png" />
			<!-- Graph Bar -->
			<div
				class="flex h-10 {teamIndex === 1 ? 'flex-row-reverse' : ''} "
				style="width: {barWidth}%;"
			>
				<div
					class="flex h-10 items-center {teamIndex === 1 ? 'justify-end' : ''} bg-amber-300"
					style="width: {physicalDmgPercentage}%;"
				>
					🪓
				</div>
				<div
					class="flex h-10 items-center {teamIndex === 1 ? 'justify-end' : ''} bg-amber-500"
					style="width: {magicalDmgPercentage}%;"
				>
					💫
				</div>
				<div class="h-10 {teamIndex === 1 ? 'justify-end' : ''} bg-white" style="width: {trueDmgPercentage}%;"></div>
			</div>
			<h1 class="font-bold text-white">{stats['TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']}</h1>
		</div>
	{/each}
</div>
