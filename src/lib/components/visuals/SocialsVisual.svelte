<script>
	import { fade } from 'svelte/transition';
	import logo from '$lib/assets/rolLogoVertical.avif';
	import nlcLogoGold from '$lib/assets/nlc/nlcLogoGold.avif'

    let {visualStyle} = $props();
</script>

<div class="flex h-full w-full" transition:fade>
	<!-- Left: Logo -->
	<div class="flex w-2/5 items-center justify-center">
		<img src={visualStyle === "NLC" ? nlcLogoGold : logo} alt={visualStyle} class="w-56 object-contain" />
	</div>

	<!-- Right: Social links -->
	<div class="flex w-3/5 items-center justify-center gap-3">
		<h1 class="text-center font-heading text-4xl text-brand-text">
			{ visualStyle === "NLC" ? "Follow our socials for updates on all our matches!" : "Volg onze socials om up-to-date te blijven van al onze matches!"}
		</h1>
	</div>
</div>
