<script lang="ts">
	interface Stat {
		name: string;
		value: number;
	}

	interface Player {
		championName: string;
		playerName: string;
		stats: Stat[];
	}

	interface Props {
		players: Player[];
		maxValue: number;
		teamName: string;
		direction: 'ltr' | 'rtl';
	}

	let { players, maxValue, teamName, direction }: Props = $props();
</script>

<div class="flex flex-col items-center w-full">
	<h2 class="text-xl font-bold text-white mb-6 tracking-wide">{teamName}</h2>

	<div class="flex flex-col gap-3 w-full">
		{#each players as player (player.playerName)}
			{@const value = Math.round(player.stats[0]?.value) ?? 0}
			{@const widthPct = maxValue > 0 ? (value / maxValue) * 100 : 0}


			<div class={['flex items-center gap-2', direction === 'rtl' ? 'flex-row-reverse' : 'flex-row']}>
				<!-- Label -->
				<div class={['flex flex-col shrink-0 w-28', direction === 'rtl' ? 'items-end text-right' : 'items-start text-left']}>
					<span class="text-xs text-gray-300 font-medium leading-tight">{player.playerName}</span>
					<img class="size-10" src="./champion/{player.championName}.png">
				</div>

				<!-- Value -->
				<span class="text-xs text-indigo-300 font-medium whitespace-nowrap shrink-0 w-14 {direction === 'rtl' ? 'text-left' : 'text-right'}">
					{value.toLocaleString()}
				</span>

				<!-- Bar -->
				<div class="flex-1 flex {direction === 'rtl' ? 'justify-end' : 'justify-start'}">
					<div
						class="h-8 bg-indigo-600 rounded transition-all duration-500"
						style="width: {widthPct}%; min-width: 2px;"
					></div>
				</div>
			</div>
		{/each}
	</div>
</div>
