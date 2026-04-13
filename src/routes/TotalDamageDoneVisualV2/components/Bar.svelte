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

<div class="flex h-full {isRight ? ' flex-row-reverse' : ''}" style="width: {barWidth}%;">
	<div class="h-full bg-lime" style="width: {physicalPctAnimation.current}%;"></div>
	<div class="h-full bg-brand-blue" style="width: {magicPctAnimation.current}%;"></div>
	<div class="h-full bg-off-white" style="width: {truePctAnimation.current}%;"></div>
</div>
