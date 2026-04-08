<script lang="ts">
	interface Stat {
		name: string;
		value: number;
	}

	interface Player {
		teamID: number
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
			{@const direction = player.teamID}


			<div class="flex">
				<!-- Label -->
				<div>
					<img class="size-10" src="./champion/{player.championName}.png">
				</div>
			</div>
		{/each}
	</div>
</div>
