<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	let { isRight, barWidth, physicalPct, magicPct, truePct, index } = $props();

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

	// Run the animation via Tweens
	$effect(() => {
		physicalPctAnimation.target = physicalPct;
		magicPctAnimation.target = magicPct;
		truePctAnimation.target = truePct;
	});
</script>

<div class="flex h-full w-full bg-royal {isRight ? ' flex-row-reverse' : ''}">
	<div class="flex h-full {isRight ? ' flex-row-reverse' : ''}" style="width: {barWidth}%;">
		<div
			class="flex items-center h-full overflow-hidden z-20 {isRight ? 'bg-brand-orange flex-row-reverse' : 'bg-brand-blue'}"
			style="width: {physicalPctAnimation.current}%;"
		>
			<img class="brightness-0 invert-100 size-5 absolute" src="./StatModsIcons/StatModsPhysical DamageIcon.png" />
		</div>
		<div
			class="flex items-center h-full overflow-hidden z-20 {isRight ? 'bg-brand-orange-2 flex-row-reverse' : 'bg-blue-800'}"
			style="width: {magicPctAnimation.current}%;"
		>
			<img class="brightness-0 invert-100 size-5 absolute" src="./StatModsIcons/StatModsMagic DamageIcon.png" />
		</div>
		<div class="h-full bg-off-white z-10" style="width: {truePctAnimation.current}%;"></div>
	</div>
</div>
