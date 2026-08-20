<script lang="ts">
	import { onMount } from 'svelte';
	import TotalDamageDone from './TotalDamageDone.svelte';
	import type { ApiResponse } from '$lib/types/api';
	import type { PostMatchStats } from '$lib/types/postGameStats';

	let {
		data,
		visualStyle
	}: { data: ApiResponse<PostMatchStats>; visualStyle: string | undefined } = $props();

	let team100 = $derived(data.data.teams[100]);
	let team200 = $derived(data.data.teams[200]);
	let comparisonRows = $derived(data.data.comparisonRows);
	let meta = $derived(data.data.meta);
	let goldDiff = $derived(data.data.goldDiffGraph);

	let canvas: HTMLCanvasElement | null = $state(null);
	let graphWidth = $state(0);
	let graphHeight = $state(0);

	onMount(() => {
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (ctx === null) {
			return;
		}
		let xScale = graphWidth / goldDiff.goldDiffValues.length;
		let yScale = graphHeight / (goldDiff.highestValue - goldDiff.lowestValue);
		let yAxisIndex = goldDiff.lowestValue * yScale * -1; // * -1  to make it non-negative

		canvas.width = graphWidth;
		canvas.height = graphHeight;

		drawLine(ctx, xScale, yScale, yAxisIndex, 0, 0, 0, graphWidth, 1, 'grey');

		goldDiff.goldDiffValues.forEach((g, i) => {
			const prevValue = goldDiff.goldDiffValues[i - 1];
			const prevIndex = i - 1;
			if (i !== 0) {
				drawLine(ctx, xScale, yScale, yAxisIndex, prevValue, g, prevIndex, i, 3, g >= 0 ? 'yellow' : 'white');
			}
		});
	});

	function drawLine(
		ctx: CanvasRenderingContext2D,
		xScale: number,
		yScale: number,
		yAxisIndex: number,
		fromGoldDiffValue: number,
		toGoldDiffValue: number,
		fromGameMinute: number,
		toGameMinute: number,
		lineThickness: number,
		colour: string,
	) {
		const x1 = Math.floor(fromGameMinute * xScale);
		const y1 = Math.floor(fromGoldDiffValue * yScale + yAxisIndex);
		const x2 = Math.floor(toGameMinute * xScale);
		const y2 = Math.floor(toGoldDiffValue * yScale + yAxisIndex);

		console.log(x1, x2, y1, y2);
		ctx.lineWidth = lineThickness;
		ctx.strokeStyle = colour;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();
	}
</script>

<main class="flex h-full w-full flex-col gap-2.5 p-5">
	<section class="flex w-full items-center justify-between">
		<div class="flex h-full w-full items-center justify-evenly border border-brand-border p-5">
			<h1 class="postGameHeader">{team100.teamName}</h1>
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
		<div class="flex w-full flex-col gap-2">
			<div class="border border-brand-border text-center">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">
					DAMAGE DEALT TO CHAMPIONS
				</h1>
				<TotalDamageDone data={data.data.totalDamageDone}  isPostGame={true} />
			</div>

			<div class="h-62.25 w-full border border-brand-border p-5 text-center">
				<canvas
					class="h-full w-full border border-brand-border bg-black/50"
					bind:this={canvas}
					bind:clientHeight={graphHeight}
					bind:clientWidth={graphWidth}
				>
				</canvas>
			</div>
		</div>
	</section>
</main>
