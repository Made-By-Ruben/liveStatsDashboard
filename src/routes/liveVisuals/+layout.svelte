<script lang="ts">
	import Stinger from '$lib/components/Stinger.svelte';
	import { fade } from 'svelte/transition';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();

	let stingerPlaying = $state(true);
	$effect(() => {
		setTimeout(() => (stingerPlaying = false), 2000);
	});
</script>

<main class="relative h-270 w-480">
	<div
		class="mainContainer absolute bottom-0 left-75.5 flex h-62.5 w-334.5 flex-col border border-border-blue bg-[url(/src/lib/assets/croppedBg.avif)]"
	>
		<div class="h-full w-full" transition:fade={{ duration: 100 }}>{@render children()}</div>
	</div>
</main>

<style>
	.mainContainer {
		animation: backgroundIn;
		animation-duration: 500ms;
		animation-timing-function: step-end;
	}

	@keyframes backgroundIn {
		0% {
			background: transparent;
		}
		100% {
			background-image: url(/src/lib/assets/Background.avif);
		}
	}
</style>
