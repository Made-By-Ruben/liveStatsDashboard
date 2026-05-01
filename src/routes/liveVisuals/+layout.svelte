<script lang="ts">
	import Stinger from '$lib/components/Stinger.svelte';
	import type { LayoutProps } from '../$types';


	let { data, children }: LayoutProps = $props();

	let animationPlaying = $state(true);
	$effect(()=> {
		setTimeout((() => animationPlaying = false), 2000)
	})

</script>

<!-- Current config for stream:
	Aspect Ratio:
		Total width: 1920px
		Total height: 1080px
	Lower HUD:
		Height: 258px
		left el width: 302px
		middle el width: 1338px
		right el width: 280px  
-->

<main class="relative h-270 w-480 bg-[url(/src/lib/assets/Background.avif)]">
	<div class="absolute bottom-0 left-75.5 flex h-64.5 w-334.5 flex-col border border-border-blue">
		{#if animationPlaying}
			<Stinger />
		{:else}
			{@render children()}
		{/if}
	</div>
</main>
