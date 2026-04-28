<script lang="ts">
	import z from 'zod';
	import Top from '$lib/assets/roleIconsGreen/Top.png';
	import Jungle from '$lib/assets/roleIconsGreen/Jungle.png';
	import Mid from '$lib/assets/roleIconsGreen/Mid.png';
	import Bot from '$lib/assets/roleIconsGreen/Bot.png';
	import Support from '$lib/assets/roleIconsGreen/Support.png';

	const roleIcons: Record<string, string> = {
		Top,
		Jungle,
		Mid,
		Bot,
		Support
	};

	const FilteredPlayerData = z.object({
		championName: z.string(),
		playerName: z.string(),
		role: z.string(),
		teamID: z.number(),
		filteredStats: z.record(z.string(), z.number())
	});
	type FilteredPlayerData = z.infer<typeof FilteredPlayerData>;

	let { data } = $props();

	$inspect(data);

	const spotlightedPlayer: FilteredPlayerData = $derived(data.spotlightedPlayer);
</script>

<div class="flex">
	<!-- Hero section -->
	<div>
		<img
			class="h-61.5"
			src="https://cdn.communitydragon.org/latest/champion/{spotlightedPlayer.championName}/splash-art"
			alt=""
		/>
	</div>
	<!-- Information section -->
	<div class="px-10 py-5 font-heading tracking-widest">
		<span class="flex items-center gap-5">
			<span class="flex items-center gap-1 font-heading tracking-widest text-lime uppercase">
				<img class="size-4" src={roleIcons[spotlightedPlayer.role]} />
				<p>{spotlightedPlayer.role} lane</p>
			</span>
			<span class="flex gap-1">
				<p class="text-off-white/75">PLAYING:</p>
				<p class="text-off-white">{spotlightedPlayer.championName}</p>
			</span>
		</span>
		<span class="text-8xl text-off-white">{spotlightedPlayer.playerName}</span>
	</div>
</div>
