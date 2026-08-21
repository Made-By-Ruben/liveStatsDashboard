<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	import physicalDmgIcon from '$lib/assets/shared/statModsIcons/StatModsPhysical DamageIcon.png';
	import magicalDmgIcon from '$lib/assets/shared/statModsIcons/StatModsMagic DamageIcon.png';

	let { isRight, barWidth, physicalPct, magicPct, truePct, index, isPostGame, team100Won } =
		$props();

	// svelte-ignore state_referenced_locally
	let totalAnimation = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 300 + index * 50
	});

	// svelte-ignore state_referenced_locally
	let physicalPctAnimation = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 300 + index * 50
	});
	// svelte-ignore state_referenced_locally
	let magicPctAnimation = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 300 + index * 100
	});

	// svelte-ignore state_referenced_locally
	let truePctAnimation = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 300 + index * 150
	});

	$effect(() => {
		totalAnimation.target = barWidth;
		physicalPctAnimation.target = physicalPct;
		magicPctAnimation.target = magicPct;
		truePctAnimation.target = truePct;
	});
</script>

<div
	class="flex h-full w-full border border-brand-border bg-brand-primary-3 {isRight
		? ' flex-row-reverse pl-1'
		: 'pr-1'}"
>
	<div class="flex h-full {isRight ? ' flex-row-reverse' : ''}" style="width: {barWidth}%;">
		{#if isPostGame}
			<div
				class={[
					'z-20 flex h-full items-center overflow-hidden',
					!isRight && !team100Won && 'bg-white',
					!isRight && team100Won && 'bg-brand-highlight-1',
					isRight && team100Won && 'bg-white',
					isRight && !team100Won && 'flex-row-reverse bg-brand-highlight-1'
				]}
				style="width: {totalAnimation.current}%;"
			></div>
		{:else}
			<div
				class="z-20 flex h-full items-center overflow-hidden {isRight
					? 'flex-row-reverse bg-brand-secondary-1'
					: 'bg-brand-primary-1'}"
				style="width: {physicalPctAnimation.current}%;"
			>
				<img class="absolute size-5" src={physicalDmgIcon} alt="PHYSICAL" />
			</div>
			<div
				class="z-20 flex h-full items-center overflow-hidden {isRight
					? 'flex-row-reverse bg-brand-secondary-2'
					: 'bg-brand-primary-2'}"
				style="width: {magicPctAnimation.current}%;"
			>
				<img class="absolute size-5" src={magicalDmgIcon} alt="MAGIC" />
			</div>
			<div class="z-10 h-full bg-brand-off-white" style="width: {truePctAnimation.current}%;"></div>
		{/if}
	</div>
</div>
