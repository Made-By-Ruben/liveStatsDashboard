<script lang="ts">
	import './layout.css';
	import magicDmgIcon from '$lib/assets/shared/statModsIcons/StatModsMagic DamageIcon.png';
	import physicalDmgIcon from '$lib/assets/shared/statModsIcons/StatModsPhysical DamageIcon.png';
	import { getVisualAssets } from '$lib/visualAssetsConfig';
	import redBullLogo from '$lib/assets/shared/redBullLogo.avif';
	import kitKatLogo from '$lib/assets/shared/kitKatLogo.svg'
	let { children } = $props();

	let visualStyle = $state<string | null>();
	let visualAssets = $derived(getVisualAssets(visualStyle));
	$effect(() => {
		visualStyle = localStorage.getItem('visualStyle');
	});
</script>

<svelte:head>
	<link rel="icon" href={visualAssets.spotlightLogo} />
	<link rel="preload" href={magicDmgIcon} as="image" type="image/png" />
	<link rel="preload" href={physicalDmgIcon} as="image" type="image/png" />
	<link rel="preload" href={visualAssets.backgroundCropped} as="image" type="image/avif" />
	<link rel="preload" href={visualAssets.background} as="image" type="image/avif" />
	<link rel="preload" href={visualAssets.logo} as="image" type="image/avif" />
	<link rel="preload" href={visualAssets.spotlightLogo} as="image" type="image/avif" />
	<link rel="preload" href={redBullLogo} as="image" type="image/avif" />
	<link rel="preload" href={kitKatLogo} as="image" type="image/avif" />

	{#each Object.values(visualAssets.roleIcons) as roleIcon}
		<link rel="preload" href={roleIcon} as="image" type="image/avif" />
	{/each}
</svelte:head>
<main class={[visualStyle === 'NLC' && 'nlc']}>
	{@render children()}
</main>
