<script lang="ts">
	import Top from '$lib/assets/roleIconsGreen/Top.png';
	import Jungle from '$lib/assets/roleIconsGreen/Jungle.png';
	import Middle from '$lib/assets/roleIconsGreen/Mid.png';
	import Bottom from '$lib/assets/roleIconsGreen/Bot.png';
	import Support from '$lib/assets/roleIconsGreen/Support.png';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import Arrow from '$lib/assets/arrow.png';
	import Logo from '$lib/assets/icon2026.png'
	import { fade } from 'svelte/transition';

	const roleIcons: Record<string, string> = {
		Top,
		Jungle,
		Middle,
		Bottom,
		Support
	};

	let { champName, role, playerName, statEntries } = $props();
</script>

<div class="flex h-full w-full" transition:fade>
	<!-- Hero section -->
	<div class="h-full w-1/3 overflow-hidden border-r border-border-blue">
		<img src="https://cdn.communitydragon.org/latest/champion/{champName}/splash-art" alt="" />
	</div>

	<!-- Information section -->
	<div class="flex w-2/3 flex-col justify-evenly font-heading tracking-widest">
		<!-- Player Lane & Champion  -->
		<div class="flex justify-between border-b border-border-blue px-10 py-2">
			<div class="flex gap-5">
				<span class="flex items-center gap-1 text-lime uppercase">
					<img class="size-5" src={roleIcons[role]} alt="" />
					<p class="pt-0.75 leading-none">{role}</p>
				</span>
				<span class="flex items-center gap-1 pt-0.75 leading-none">
					<p class="text-off-white/75">PLAYING:</p>
					<p class=" text-off-white">{champName}</p>
				</span>
			</div>
			<img class="h-8" src={Logo} alt="ROL" />
		</div>

		<!-- Player Name -->
		<span class="border-b border-border-blue px-10 py-2 text-8xl text-off-white">{playerName}</span>

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
