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

<div class="w-20 text-center">
	<div class="font-heading text-2xl text-white">
		{Math.floor(statAnimated.current).toLocaleString()}
	</div>
</div>
