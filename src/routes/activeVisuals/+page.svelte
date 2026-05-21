<script lang="ts">
	import Stinger from '$lib/components/Stinger.svelte';
	import StingerOut from '$lib/components/StingerOut.svelte';
	import LiveVisual from '$lib/components/visuals/LiveVisual.svelte';

	let visualState = $state<null | 'animateIn' | 'live' | 'animateOut'>(null);
	let bgVisable = $state(false);

	function buttonHandler(value: null | 'animateIn' | 'live' | 'animateOut') {
		if (value === "animateIn") {
			visualState === null ? visualState = value : null;
			return
		}
		visualState = value;
		return;
	};
</script>

<main class="relative h-270 w-480">
	<button onclick={() => buttonHandler('animateIn')}> show Visual </button>
	<button onclick={() => buttonHandler('animateOut')}> hide Visual </button>
	<div
		class={[
			'absolute bottom-0 left-75.5 flex h-62.5 w-334.5 flex-col border border-border-blue',
			bgVisable && 'bg-[url(/src/lib/assets/croppedBg.avif)]'
		]}
	>
		{#if visualState === 'animateIn'}
			<Stinger onComplete={() => {visualState = 'live'}} onCurtainsMeet={()=>{bgVisable = true}} />
		{/if}
		{#if visualState === 'live'}
			<LiveVisual
				url={'http://localhost:3000/defaultVisuals/stream/TOTAL_DAMAGE_DONE_H2H/311'}
				visualName={'totalDamageDone'}
			/>
		{/if}
		{#if visualState === 'animateOut'}
				<StingerOut onComplete={() => {visualState = null}} onCurtainsMeet={()=>{bgVisable = false}} />
		{/if}
	</div>
</main>
