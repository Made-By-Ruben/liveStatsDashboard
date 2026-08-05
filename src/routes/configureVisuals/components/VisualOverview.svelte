<script lang="ts">
	import type { Visual } from '$lib/server/schemas';
	import { fade } from 'svelte/transition';
	type propTypes = {
		visuals: Visual[];
		onVisualClick(visual: Visual): void;
	}
	let { visuals, onVisualClick }: propTypes = $props();
</script>

<div
	class="grid h-[90%] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
	in:fade={{ duration: 200 }}
>
	{#each visuals as visual}
		<button
			onclick={() => onVisualClick(visual)}
			class="group flex cursor-pointer flex-col items-baseline justify-between rounded border border-brand-border p-5 text-brand-off-white transition-all hover:border-brand-highlight-1 hover:shadow-2xl"
		>
			<div class="flex w-full justify-between font-label">
				<p class="">{'Visual: ' + visual.visualID}</p>
				<p>{visual.visualConfig.selectedTeam} {visual.visualConfig.selectedRole}</p>
			</div>

			<h1 class="font-heading text-3xl font-bold">{visual.visualLabel}</h1>

			<div class="flex w-full justify-between font-label">
				<p class="rounded bg-brand-highlight-1 px-5 font-label text-brand-dark-1">
					Stats: {visual.visualConfig.requestedStats.length}
				</p>
				<p class="invisible font-label text-xs text-brand-off-white/80 group-hover:visible">Edit</p>
			</div>
		</button>
	{/each}
</div>
