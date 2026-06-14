<script lang="ts">
	import StatBadge from '$lib/components/StatBadge.svelte';
	import Arrow from '$lib/assets/rol/arrow.png';
	import { fade } from 'svelte/transition';
	import { getVisualAssets } from '$lib/visualAssetsConfig';

	let { data, visualStyle } = $props();

	let visualAssets = $derived(getVisualAssets(visualStyle));
</script>

<div class="flex h-full w-full" transition:fade>
	<!-- Hero section -->
	<div class="h-full w-1/3 overflow-hidden border-r border-brand-border">
		<img
			src="https://cdn.communitydragon.org/latest/champion/{data.championName}/splash-art"
			alt=""
		/>
	</div>

	<!-- Information section -->
	<div class="flex w-2/3 flex-col justify-evenly font-heading tracking-widest">
		<!-- Player Lane & Champion  -->
		<div class="flex justify-between border-b border-brand-border px-10 py-2">
			<div class="flex gap-5">
				<span class="flex items-center gap-1 text-brand-highlight-1 uppercase">
					<img class="size-5" src={visualAssets.roleIcons[data.role]} alt="" />
					<p class="pt-0.75 leading-none">{data.role}</p>
				</span>
				<span class="flex items-center gap-1 pt-0.75 leading-none">
					<p class="text-brand-text/75">PLAYING:</p>
					<p class=" text-brand-text">{data.championName}</p>
				</span>
			</div>
			<img class="h-8" src={visualAssets.spotlightLogo} alt="ROL" />
		</div>

		<!-- Player Name -->
		<span class="border-b border-brand-border px-10 py-2 text-8xl text-brand-text"
			>{data.playerName}</span
		>

		<!-- Player Stats -->
		<div class="flex border-brand-border px-10">
			{#each Object.entries(data.filteredStats) as [statName, value], i}
				<div
					class={[
						'flex min-w-1/4 flex-col items-center border-r border-brand-border p-2',
						i === 0 && 'border-l'
					]}
				>
					<span
						class="flex items-center gap-1 font-label text-xs leading-none tracking-widest text-brand-text"
					>
						<img class="size-2" src={Arrow} alt="" />
						<span class="leading-none text-brand-highlight-1">{statName}</span>
					</span>
					<StatBadge stat={value} --font-size="50px" />
				</div>
			{/each}
		</div>
	</div>
</div>
