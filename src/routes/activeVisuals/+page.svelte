<script lang="ts">
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import { ActiveVisual } from '$lib/activeVisual.svelte.js';
	import LiveVisual from './visuals/LiveVisual.svelte';
	import Stinger from './visuals/stingers/Stinger.svelte';
	import StingerBig from './visuals/stingers/StingerBig.svelte';
	import StingerOut from './visuals/stingers/StingerOut.svelte';
	import type { VisualState, CompanionEvent } from '$lib/types/activeVisuals';
	import { cacheImages } from '$lib/utils/cacheImages';
	import { getVisualStyle } from '$lib/utils/getVisualStyle.js';
	import { onMount } from 'svelte';
	import { getTeamIcon } from '$lib/visualAssetsConfig';
	let { data } = $props();

	function cacheAssets() {
		cacheImages(data.gameInfo.participants);
		const team100Win = new Image();
		const team100Loss = new Image()
		team100Win.src = getTeamIcon(visualStyle, data.gameInfo.team100.name, true);
		team100Loss.src = getTeamIcon(visualStyle, data.gameInfo.team100.name, true);
		const team200Win = new Image();
		const team200Loss = new Image()
		team200Win.src = getTeamIcon(visualStyle, data.gameInfo.team200.name, true);
		team200Loss.src = getTeamIcon(visualStyle, data.gameInfo.team200.name, true);
	}

	let visualState = $state<VisualState>(null);
	let event = $state<CompanionEvent>();
	let bgVisible = $state(false);
	let visual = $state<ActiveVisual>();
	let visualStyle = $state<string>();

	onMount(() => {
		visualStyle = getVisualStyle();
		cacheAssets()
	});
	$effect(() => {
		const stream = new EventSource(`${PUBLIC_SERVER_URL}companionRelay/stream`);

		stream.addEventListener('animateIn', onAnimateIn);
		stream.addEventListener('animateOut', onAnimateOut);
		stream.addEventListener('refreshAssets', onRefreshAssets);

		return () => stream.close();
	});

	async function onAnimateIn(e: MessageEvent) {
		if (visualState === null) {
			visualState = 'animateIn';
			const data = JSON.parse(e.data) as CompanionEvent;
			event = data;
			visual = new ActiveVisual(data.visualName, data.visualType);
			visual.getData(PUBLIC_SERVER_URL);
		}
	}

	async function onAnimateOut(e: MessageEvent) {
		visualState = 'animateOut';
		visual?.clearVisual();
	}

	async function onRefreshAssets(e: MessageEvent) {
		const data = JSON.parse(e.data);
		cacheImages(data.participants);
	}
</script>

<main class="relative h-270 w-480">
	{#if event?.visualType === 'postGameVisuals'}
		<div
			class={[
				'h-full w-full flex-col bg-cover',
				bgVisible && visualStyle === 'ROL' && 'bg-[url(/src/lib/assets/rol/rolBg.avif)]',
				bgVisible && visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcBg.avif)]'
			]}
		>
			{#if visualState === 'animateIn'}
				<StingerBig
					onComplete={() => {
						visualState = 'live';
					}}
					onDroppedDown={() => {
						bgVisible = true;
					}}
				/>
			{:else if visualState === 'live'}
				<LiveVisual {visual} {visualStyle} onFadedOut={() => (visualState = 'stingerOut')} />
			{:else if visualState === 'stingerOut'}
				<StingerBig
					onComplete={() => {
						visualState = null;
					}}
					onDroppedDown={() => {
						bgVisible = false;
					}}
				/>
			{/if}
		</div>
	{:else}
		<div
			class={[
				'absolute bottom-0 left-75.5 flex h-62.25 w-334.25 flex-col',
				bgVisible && visualStyle === 'ROL' && 'bg-[url(/src/lib/assets/rol/rolCroppedBg.avif)]',
				bgVisible && visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcCroppedBg.avif)]'
			]}
		>
			{#if visualState === 'animateIn'}
				<Stinger
					onComplete={() => {
						visualState = 'live';
					}}
					onCurtainsMeet={() => {
						bgVisible = true;
					}}
					{visualStyle}
				/>
			{/if}
			{#if visualState === 'live'}
				<LiveVisual {visual} {visualStyle} onFadedOut={() => (visualState = 'animateOut')} />
			{/if}
			{#if visualState === 'animateOut'}
				<StingerOut
					onComplete={() => {
						visualState = null;
					}}
					onCurtainsMeet={() => {
						bgVisible = false;
					}}
				/>
			{/if}
		</div>
	{/if}
</main>
