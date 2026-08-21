<script lang="ts">
	import TotalDamageDone from './TotalDamageDone.svelte';
	import type { ApiResponse } from '$lib/types/api';
	import type { PostMatchStats } from '$lib/types/postGameStats';
	import GoldDiffGraph from './GoldDiffGraph.svelte';

	let {
		data,
		visualStyle
	}: { data: ApiResponse<PostMatchStats>; visualStyle: string | undefined } = $props();

	let team100 = $derived(data.data.teams[100]);
	let team200 = $derived(data.data.teams[200]);
	let comparisonRows = $derived(data.data.comparisonRows);
	let meta = $derived(data.data.meta);
	let goldDiff = $derived(data.data.goldDiffGraph);
</script>

<main class="flex h-full w-full flex-col gap-2.5 p-5">
	<section class="flex w-full items-center justify-between">
		<div class="flex h-full w-full items-center justify-evenly border border-brand-border p-5">
			<h1 class="postGameHeader" style={team100.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}>{team100.teamName}</h1>
			<p
				class="font-label text-4xl font-bold text-brand-off-white/90"
				style={team100.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
			>
				{team100.teamHasWon ? 'WIN' : 'LOSS'}
			</p>
			<h1 class="postGameHeader">{team100.teamScore}</h1>
		</div>

		<div class="flex w-full flex-col items-center border border-brand-border p-5">
			<h1 class="postGameHeader">{meta.gameTimeDisplay}</h1>
			<p class="font-label text-4xl font-bold text-brand-off-white/90">GAMETIME</p>
		</div>

		<div class="flex h-full w-full items-center justify-evenly border border-brand-border p-5">
			<h1 class="postGameHeader">{team200.teamName}</h1>
			<p
				class="font-label text-4xl font-bold text-brand-off-white/90"
				style={team200.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
			>
				{team200.teamHasWon ? 'WIN' : 'LOSS'}
			</p>
			<h1 class="postGameHeader">{team200.teamScore}</h1>
		</div>
	</section>

	<section class="grid h-full w-full grid-cols-2 gap-2.5">
		<!-- comparison Rows -->
		<div class="grid grid-cols-1 border border-brand-border">
			{#each comparisonRows as row}
				{#if row.kind === 'bans'}
					<!-- ToDo -->
				{:else}
					<div class="grid w-full grid-cols-3 border-b border-brand-border">
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
		<!-- Graphs etc. -->
		<div class="flex w-full flex-col gap-2 ">
			<div class="border border-brand-border text-center	">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">
					DAMAGE DEALT TO CHAMPIONS
				</h1>
				<TotalDamageDone data={data.data.totalDamageDone} isPostGame={true} team100Won={team100.teamHasWon} />
			</div>

			<div class="border border-brand-border text-center bg-black/50">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">
					GOLD DIFFERENCE OVER TIME
				</h1>
				<GoldDiffGraph {goldDiff} team100Won={team100.teamHasWon} />
			</div>
		</div>
	</section>
</main>
