<script lang="ts">
	import type { ComparisonRow, TeamInfo } from "$lib/types/postGameStats";

    let {comparisonRows, team100, team200}: {comparisonRows: ComparisonRow[], team100: TeamInfo, team200: TeamInfo} = $props()
</script>

<div class="grid grid-cols-1 border border-brand-border">
	{#each comparisonRows as row, i}
		{#if row.kind === 'bans'}
			<!-- ToDo -->
		{:else}
			<div class="rowFlyIn grid w-full grid-cols-3 border-b border-brand-border opacity-0" style="animation-delay: {i*100}ms;">
				<h1
					class="self-center justify-self-center font-heading text-6xl font-black text-brand-off-white"
					style={team100.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
				>
					{row.team100Value.display}
				</h1>
				<h2
					class="self-center justify-self-center font-label text-4xl font-bold text-brand-off-white/90"
				>
					{row.label}
				</h2>
				<h1
					class="self-center justify-self-center font-heading text-6xl font-black text-brand-off-white"
					style={team200.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
				>
					{row.team200Value.display}
				</h1>
			</div>
		{/if}
	{/each}
</div>


<style>
	.rowFlyIn {
		animation: fadeIn 1000ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
	}
	@keyframes fadeIn {
		0% {
			opacity: 100%;
			width: 0%;
		}
		100% {
			opacity: 100%;
			width: 100%;
		}
	}
</style>