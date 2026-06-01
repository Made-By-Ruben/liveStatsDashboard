<script lang="ts">
	import { calcPercentage } from '$lib/utils/calcPercentage';
	import Bar from './Bar.svelte';
	import StatBadge from './StatBadge.svelte';

	let { team, teamIndex, maxDamage } =
		$props();

	const totalDmgChamps = 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const physicalDmgChamps = 'PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const magicDmgChamps = 'MAGIC_DAMAGE_DEALT_TO_CHAMPIONS';
	const trueDmgChamps = 'TRUE_DAMAGE_DEALT_TO_CHAMPIONS';

	const isRight = $derived(teamIndex === 1);
</script>

<!-- TODO: move Percentage calculation to the back-end -->

<div class={["flex w-1/2 flex-col border-brand-border", isRight ? "border-l" : "border-r"]}>
	{#each team as player, index}
		{@const barWidth = calcPercentage(player.filteredStats[totalDmgChamps], maxDamage)}
		{@const physicalPct = calcPercentage(player.filteredStats[physicalDmgChamps], player.filteredStats[totalDmgChamps])}
		{@const magicPct = calcPercentage(player.filteredStats[magicDmgChamps], player.filteredStats[totalDmgChamps])}
		{@const truePct = calcPercentage(player.filteredStats[trueDmgChamps], player.filteredStats[totalDmgChamps])}

		<div class="flex h-1/5 w-full px-2 py-2 {isRight ? 'flex-row-reverse' : ''} ">
			<div class="flex w-full items-center gap-2 {isRight ? 'flex-row-reverse' : ''} ">
				<img class="size-10 border-2 border-brand-border" src={`https://cdn.communitydragon.org/latest/champion/${player.championName}/square`} alt={player.championName} />

				<!-- Player name -->
				<div
					class="w-24 leading-none font-label text-xs font-bold tracking-widest text-brand-text uppercase {isRight
						? 'text-right'
						: 'text-left'}"
				>
					{player.championName}
				</div>

				<Bar {barWidth} {isRight} {magicPct} {physicalPct} {truePct} {index} />
			</div>

			<div class="w-20 text-center">
				<StatBadge stat={player.filteredStats[totalDmgChamps]} --font-size="x-large" />
			</div>
		</div>
	{/each}
</div>
