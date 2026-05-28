<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	let { stat } = $props();

	let statAnimated = new Tween(0, {
		duration: 250,
		easing: cubicOut,
		delay: 400
	});

	$effect(() => {
		statAnimated.target = stat;
	});
</script>

<div class="font-heading text-brand-text line-clamp-1" style="font-size: var(--font-size); line-height: 1;">
	{Math.floor(statAnimated.current).toLocaleString()}
</div>
