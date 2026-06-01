<script lang="ts">
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import { ActiveVisual } from '$lib/activeVisual.svelte.js';
	import Stinger from '$lib/components/visuals/stingers/Stinger.svelte';
	import StingerOut from '$lib/components/visuals/stingers/StingerOut.svelte';
	import LiveVisual from '$lib/components/visuals/LiveVisual.svelte';
	import { getVisualStyle } from '$lib/utils/getVisualStyle.js';
	import { onDestroy, onMount } from 'svelte';
	type VisualState = null | 'animateIn' | 'live' | 'animateOut';
	type CompanionEvent = { visualType: 'default' | 'custom'; visualName: number | string };
	type ActiveChamps = {
		championName: string;
	}[];

	let { data } = $props();

	let visualState = $state<VisualState>(null);
	let bgVisable = $state(false);
	let visual = $state<ActiveVisual>();
	let visualStyle = $state<string>();
	let activeChamps = $derived<ActiveChamps>(data.champions.participants);

	$effect(() => {
		const stream = new EventSource(`${PUBLIC_SERVER_URL}companionRelay/stream`);

		stream.addEventListener('animateIn', async (e) => {
			if (visualState === null) {
				visualState = 'animateIn';
				const data = JSON.parse(e.data) as CompanionEvent;
				visual = new ActiveVisual(data.visualName, data.visualType);
				visual.getData(PUBLIC_SERVER_URL);
			}
		});

		stream.addEventListener('animateOut', (e) => {
			visualState = 'animateOut';
			visual?.clearVisual();
		});

		stream.addEventListener('refreshAssets', (e) => {
			const data = JSON.parse(e.data);
			activeChamps = data;
		});

		onDestroy(() => {
			stream.close();
		});
	});

	onMount(() => {
		visualStyle = getVisualStyle();
	});
</script>

<!-- TODO: conditional preloading -->
<svelte:head>
	{#each activeChamps as activeChamp}
		<link
			rel="preload"
			href={`https://cdn.communitydragon.org/latest/champion/${activeChamp.championName}/splash-art`}
			as="image"
			type="image/jpeg"
		/>
		<link
			rel="preload"
			href={`https://cdn.communitydragon.org/latest/champion/${activeChamp.championName}/square`}
			as="image"
			type="image/jpeg"
		/>
	{/each}
</svelte:head>

<main class="relative h-270 w-480">
	<div
		class={[
			'absolute bottom-0 left-75.5 flex h-62.25 w-334.25 flex-col',
			bgVisable && visualStyle === 'ROL' && 'bg-[url(/src/lib/assets/rol/croppedBg.avif)]',
			bgVisable && visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcCroppedBg.avif)]'
		]}
	>
		{#if visualState === 'animateIn'}
			<Stinger
				onComplete={() => {
					visualState = 'live';
				}}
				onCurtainsMeet={() => {
					bgVisable = true;
				}}
				{visualStyle}
			/>
		{/if}
		{#if visualState === 'live'}
			<LiveVisual {visual} {visualStyle} />
		{/if}
		{#if visualState === 'animateOut'}
			<StingerOut
				onComplete={() => {
					visualState = null;
				}}
				onCurtainsMeet={() => {
					bgVisable = false;
				}}
			/>
		{/if}
	</div>
</main>
