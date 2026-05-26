<script lang="ts">
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import Stinger from '$lib/components/Stinger.svelte';
	import StingerOut from '$lib/components/StingerOut.svelte';
	import LiveVisual from '$lib/components/visuals/LiveVisual.svelte';
	import { onDestroy } from 'svelte';

	type VisualState = null | 'animateIn' | 'live' | 'animateOut';

	let visualState = $state<VisualState>(null);
	let bgVisable = $state(false);

	$effect(() => {
		const stream = new EventSource(`${PUBLIC_SERVER_URL}companionRelay/stream`);

		stream.addEventListener('animateIn', (e) => {
			if (visualState === null) {
				visualState = 'animateIn';
			}
		});

		stream.addEventListener('animateOut', (e) => {
			visualState = 'animateOut';
		});

		onDestroy(() => {
			stream.close();
		});
	});
</script>

<main class="relative h-270 w-480">
	<div
		class={[
			'absolute bottom-0 left-75.5 flex h-62.5 w-334.5 flex-col border border-border-blue',
			bgVisable && 'bg-[url(/src/lib/assets/croppedBg.avif)]'
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
			/>
		{/if}
		{#if visualState === 'live'}
			<LiveVisual visualCategory={'defaultVisuals'} visualName={'totalDamageDoneH2H'} />
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
