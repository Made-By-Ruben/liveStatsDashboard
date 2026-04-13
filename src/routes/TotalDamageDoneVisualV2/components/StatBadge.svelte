<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	let { stat, isRight } = $props();

	let statAnimated = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 400
	});

	$effect(() => {
		statAnimated.target = stat;
	});
</script>

<div
	class="w-20 shrink-0 flex-col items-center justify-center justify-self-end bg-egyptian px-3 py-1 {isRight
		? 'damage-badge-right'
		: 'damage-badge-left'}"
>
	<div class="font-heading text-white">
		{Math.floor(statAnimated.current).toLocaleString()}
	</div>

	<div class="font-label text-[9px] tracking-widest text-brand-blue uppercase">DMG</div>
</div>

<style>
	/* ── Damage badge parallelogram ───────────────────────────── */

	.damage-badge-left {
		clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
	}

	.damage-badge-right {
		clip-path: polygon(0% 0%, calc(100% - 6px) 0%, 100% 100%, 6px 100%);
	}
</style>
