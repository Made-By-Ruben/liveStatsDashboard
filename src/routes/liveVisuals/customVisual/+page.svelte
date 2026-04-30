<script lang="ts">
	import Top from '$lib/assets/roleIconsGreen/Top.png';
	import Jungle from '$lib/assets/roleIconsGreen/Jungle.png';
	import Middle from '$lib/assets/roleIconsGreen/Mid.png';
	import Bottom from '$lib/assets/roleIconsGreen/Bot.png';
	import Support from '$lib/assets/roleIconsGreen/Support.png';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import Arrow from '$lib/assets/arrow.png';
	import Logo from '$lib/assets/jaar + logo.png';

	const roleIcons: Record<string, string> = {
		Top,
		Jungle,
		Middle,
		Bottom,
		Support
	};

	let { data } = $props();

	const statEntries = $derived(Object.entries(data.spotlightedPlayer.filteredStats));
</script>

<div class="flex h-full">
	<!-- Hero section -->
	<div class="w-1/3 h-61.5 border-r border-border-blue overflow-hidden ">
		<img
			src="https://cdn.communitydragon.org/latest/champion/{data.spotlightedPlayer
				.championName}/splash-art"
			alt=""
		/>
	</div>

	<!-- Information section -->
	<div class="flex h-full w-2/3 flex-col justify-evenly font-heading tracking-widest">
		<!-- Player Lane & Champion  -->
		<div class="flex justify-between border-b border-border-blue px-10 py-2">
			<div class="flex items-center gap-5 leading-none">
				<span class="flex items-center justify-center gap-1 text-lime uppercase">
					<img class="size-5" src={roleIcons[data.spotlightedPlayer.role]} alt="" />
					<p class="leading-none">{data.spotlightedPlayer.role}</p>
				</span>
				<span class="flex items-center gap-1">
					<p class="leading-none text-off-white/75">PLAYING:</p>
					<p class="leading-none text-off-white">{data.spotlightedPlayer.championName}</p>
				</span>
			</div>
			<img class="h-8" src={Logo} alt="ROL" />
		</div>

		<!-- Player Name -->
		<span class="border-b border-border-blue px-10 py-2 text-8xl text-off-white"
			>{data.spotlightedPlayer.playerName}</span
		>

		<!-- Player Stats -->
		<div class="flex border-border-blue px-10">
			{#each statEntries as [statName, value], i}
				<div
					class={[
						'flex min-w-1/4 flex-col items-center border-r border-border-blue p-2',
						i === 0 && 'border-l'
					]}
				>
					<span
						class="flex items-center gap-1 font-label text-xs leading-none tracking-widest text-off-white"
					>
						<img class="size-2" src={Arrow} alt="" />
						<span class="leading-none">{statName}</span>
					</span>
					<StatBadge stat={value} --font-size="50px" />
				</div>
			{/each}
		</div>
	</div>
</div>
