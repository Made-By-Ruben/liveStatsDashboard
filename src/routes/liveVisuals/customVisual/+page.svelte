<script lang="ts">
	import z from 'zod';

	const FilteredPlayerData = z.object({
		championName: z.string(),
        playerName: z.string(),
        role: z.string(),
		teamID: z.number(),
		filteredStats: z.record(z.string(), z.number())
	});
	type FilteredPlayerData = z.infer<typeof FilteredPlayerData>;

	const VisualData = z.array(FilteredPlayerData);
	type VisualData = z.infer<typeof VisualData>;

	let { data } = $props();

    $inspect(data)

	const playerArray: VisualData = $derived(data.playerArray);
</script>

<div class="flex">
	<!-- Hero section -->
	<div>
		<img
			class="h-61.5"
			src="https://cdn.communitydragon.org/latest/champion/{playerArray[0].championName}/splash-art"
			alt=""
		/>
	</div>
	<!-- Information section -->
     <div>
        <div class="flex gap-5 px-10 py-5">
            <p class="font-heading tracking-widest text-off-white uppercase">{playerArray[0].role.toUpperCase()}</p>
            <p>PLAYING {playerArray[0].championName.toUpperCase()}</p>
        </div>
     </div>
</div>
