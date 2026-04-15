<script lang="ts">
	import { calcPercentage } from '$lib/utils/calcPercentage';
	import Bar from './Bar.svelte';
	import StatBadge from './StatBadge.svelte';

	let { team, teamIndex, maxDamage }: { team: TeamStats; teamIndex: number; maxDamage: number } =
		$props();

	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	const totalDmgChamps = 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const physicalDmgChamps = 'PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const magicDmgChamps = 'MAGIC_DAMAGE_DEALT_TO_CHAMPIONS';
	const trueDmgChamps = 'TRUE_DAMAGE_DEALT_TO_CHAMPIONS';

	const isRight = $derived(teamIndex === 1);
</script>

<div class="flex w-1/2 flex-col gap-1">
	{#each Object.entries(team) as [player, stats], index (player)}
		{@const barWidth = calcPercentage(stats[totalDmgChamps], maxDamage)}
		{@const physicalPct = calcPercentage(stats[physicalDmgChamps], stats[totalDmgChamps])}
		{@const magicPct = calcPercentage(stats[magicDmgChamps], stats[totalDmgChamps])}
		{@const truePct = calcPercentage(stats[trueDmgChamps], stats[totalDmgChamps])}

		<!-- Inner panel: clipped angular shape -->
		<div
			class="flex w-full gap-2 bg-blue-950/50 px-2 py-2 {isRight
				? 'flex-row-reverse'
				: ''} justify-between gap-3"
		>
			<div class="flex w-full items-center gap-2 {isRight ? 'flex-row-reverse' : ''} ">
				<img class="size-10 border border-brand-blue" src="./champion/{player}.png" alt={player} />

				<!-- Player name -->
				<div
					class="w-20 font-label text-xs font-bold tracking-widest text-off-white uppercase {isRight
						? 'text-right'
						: 'text-left'}"
				>
					{player}
				</div>

				<Bar {barWidth} {isRight} {magicPct} {physicalPct} {truePct} {index} />
			</div>

			<StatBadge {isRight} stat={stats[totalDmgChamps]} />
		</div>
	{/each}
</div>
