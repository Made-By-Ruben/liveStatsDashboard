<script lang="ts">
	import './layout.css';
	import icon from '$lib/assets/icon.png';
	import croppedBg from '$lib/assets/croppedBg.avif';
	import rolLogoVertical from '$lib/assets/rolLogoVertical.avif';
	import nlcLogoGold from '$lib/assets/nlcLogoGold.avif';
	import nlcCroppedBg from '$lib/assets/nlcCroppedBg.avif';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={icon} />
	<link rel="preload" href={croppedBg} as="image" type="image/avif" />
	<link rel="preload" href={nlcCroppedBg} as="image" type="image/avif" />
	<link rel="preload" href={rolLogoVertical} as="image" type="image/avif" />
	<link rel="preload" href={nlcLogoGold} as="image" type="image/avif" />
</svelte:head>
<main class={[data.visualStyle === "NLC" && "nlc"]}>
	{@render children()}
</main>
