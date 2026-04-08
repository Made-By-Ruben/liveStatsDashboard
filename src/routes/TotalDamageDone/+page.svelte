<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen w-full items-center justify-between bg-gray-900 px-4 py-10">
	<div>
		{#each data.team1 as player}
			<img class="size-10" src="./champion/{player.championName}.png" />
			<a>{player.stats[0].value}</a>
		{/each}
	</div>
	<div>
		{#each data.team2 as player}
			<img class="size-10" src="./champion/{player.championName}.png" />
		{/each}
	</div>
</div>
