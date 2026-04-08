<script lang="ts">
	import type { PageProps } from './$types';
	import BarChart from '$lib/components/BarChart.svelte';

	let { data }: PageProps = $props();

	const teamLeft = $derived(data.data.slice(0, 5));
	const teamRight = $derived(data.data.slice(5, 10));

	const maxValue = $derived.by(() => {
		let max = 0;
		for (const player of data.data) {
			const val = player.stats[0]?.value ?? 0;
			if (val > max) max = val;
		}
		return Math.round(max);
	});

</script>

<div class="min-h-screen w-full bg-gray-900 flex items-center py-10 px-4">

	<div class="flex w-full items-start justify-between gap-0">
		<!-- Left team -->
		<div class="flex-1">
			<BarChart players={teamLeft} {maxValue} teamName="DYN" direction="rtl" />
		</div>


		<!-- Right team -->
		<div class="flex-1">
			<BarChart players={teamRight} {maxValue} teamName="MCON" direction="ltr" />
		</div>
	</div>
</div>
