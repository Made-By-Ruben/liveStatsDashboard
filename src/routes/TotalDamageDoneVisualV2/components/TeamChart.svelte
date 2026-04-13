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
	<!-- Team Label -->
	<div
		class="team-label borde mb-2 border-b border-lime px-1 pb-1 font-heading text-sm tracking-[0.2em] text-lime {isRight
			? 'text-right'
			: 'text-left'}"
	>
		{isRight ? 'TEAM 2 ◆' : '◆ TEAM 1'}
	</div>

	{#each Object.entries(team) as [player, stats], index (player)}
		{@const barWidth = calcPercentage(stats[totalDmgChamps], maxDamage)}
		{@const physicalPct = calcPercentage(stats[physicalDmgChamps], stats[totalDmgChamps])}
		{@const magicPct = calcPercentage(stats[magicDmgChamps], stats[totalDmgChamps])}
		{@const truePct = calcPercentage(stats[trueDmgChamps], stats[totalDmgChamps])}

		<!-- Inner panel: clipped angular shape -->
		<div
			class="flex w-full gap-2 bg-blue-950/50 px-2 py-2 {isRight
				? 'flex-row-reverse'
				: ''} justify-between"
		>
			<div class="flex w-full items-center {isRight ? 'flex-row-reverse' : ''} ">
				<!-- Champion Avatar -->
				<div class="relative shrink-0">
					<img class="avatar-img size-10 object-cover" src="./champion/{player}.png" alt={player} />
					<div class="avatar-ring absolute inset-0"></div>
				</div>

				<!-- Player name -->
				<div
					class="w-20 truncate pl-2 font-label text-xs font-bold tracking-widest text-off-white uppercase {isRight
						? 'text-right'
						: 'text-left'}"
					title={player}
				>
					{player}
				</div>

				<Bar {barWidth} {isRight} {magicPct} {physicalPct} {truePct} {index} />
			</div>

			<StatBadge {isRight} stat={stats[totalDmgChamps]} />
		</div>
	{/each}
</div>

<style>
	/* ── Champion avatar clipped corsners ──────────────────────── */
	.avatar-img {
		clip-path: polygon(
			6px 0%,
			100% 0%,
			100% calc(100% - 6px),
			calc(100% - 6px) 100%,
			0% 100%,
			0% 6px
		);
	}

	.avatar-ring {
		clip-path: polygon(
			6px 0%,
			100% 0%,
			100% calc(100% - 6px),
			calc(100% - 6px) 100%,
			0% 100%,
			0% 6px
		);
		border: 1px solid #0066ff;
		opacity: 0.7;
	}
</style>
