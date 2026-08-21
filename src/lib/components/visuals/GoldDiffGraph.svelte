<script lang="ts">
	import type { GoldDiffGraph } from '$lib/types/postGameStats';
	import { onMount } from 'svelte';
	let { goldDiff, team100Won }: { goldDiff: GoldDiffGraph, team100Won: boolean | null} = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let graphWidth = $state(0);
	let graphHeight = $state(0);
	let xBounds = $derived(graphWidth * 0.1);
	let yBounds = $derived(graphHeight * 0.2);

	onMount(() => {
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (ctx === null) {
			return;
		}

		let graphOptions = {
			xScale: (graphWidth - xBounds) / goldDiff.goldDiffValues.length,
			yScale: (graphHeight - yBounds) / (goldDiff.highestValue - goldDiff.lowestValue),
			xBounds: xBounds,
			yBounds: yBounds
		};

		let yAxisIndex = goldDiff.lowestValue * graphOptions.yScale * -1; // * -1  to make it non-negative

		canvas.width = graphWidth;
		canvas.height = graphHeight;

		drawYAxis(ctx, graphOptions, yAxisIndex);
		drawXAxis(ctx, graphOptions, yAxisIndex);
		// 0 line
		drawLine(
			ctx,
			graphOptions.xScale,
			graphOptions.yScale,
			yAxisIndex,
			0,
			0,
			0,
			goldDiff.goldDiffValues.length,
			1,
			'grey'
		);
		fillGraph(ctx, graphOptions, yAxisIndex);
	});

	function drawLine(
		ctx: CanvasRenderingContext2D,
		xScale: number,
		yScale: number,
		yAxisIndex: number,
		fromY: number,
		toY: number,
		fromX: number,
		toX: number,
		lineThickness: number,
		colour: string
	) {
		const x1 = Math.floor(fromX * xScale);
		const y1 = Math.floor(fromY * yScale + yAxisIndex);
		const x2 = Math.floor(toX * xScale);
		const y2 = Math.floor(toY * yScale + yAxisIndex);

		ctx.lineWidth = lineThickness;
		ctx.strokeStyle = colour;
		ctx.beginPath();
		ctx.moveTo(x1 + xBounds / 2, y1 + yBounds / 2);
		ctx.lineTo(x2 + xBounds / 2, y2 + yBounds / 2);
		ctx.closePath();
		ctx.stroke();
	}

	function drawXAxis(
		ctx: CanvasRenderingContext2D,
		graphOptions: { yScale: number; xScale: number; xBounds: number; yBounds: number },
		yAxisIndex: number
	) {
		drawLine(
			ctx,
			graphOptions.xScale,
			graphOptions.yScale,
			yAxisIndex,
			goldDiff.highestValue,
			goldDiff.highestValue,
			0,
			goldDiff.goldDiffValues.length,
			2,
			'white'
		);
	}

	function drawYAxis(
		ctx: CanvasRenderingContext2D,
		graphOptions: { yScale: number; xScale: number; xBounds: number; yBounds: number },
		yAxisIndex: number
	) {
		drawLine(
			ctx,
			graphOptions.xScale,
			graphOptions.yScale,
			yAxisIndex,
			goldDiff.lowestValue,
			goldDiff.highestValue,
			0,
			0,
			2,
			'white'
		);
		ctx.textAlign = 'center';
		ctx.fillStyle = getLineColour(goldDiff.lowestValue);
		ctx.fillText(
			(goldDiff.lowestValue * -1).toString(),
			0 + xBounds / 4,
			0 + (yBounds + yAxisIndex) / 2
		);
        ctx.fillStyle = getLineColour(goldDiff.highestValue);
		ctx.fillText(
			goldDiff.highestValue.toString(),
			0 + xBounds / 4,
			goldDiff.highestValue * graphOptions.yScale + yAxisIndex + yBounds / 2
		);
	}

    function getLineColour(g: number) {
        if (team100Won) {
            return g >= 0 ? "yellow" : "white"
        }
        return g >= 0 ? "white" : "yellow"
    }

	function fillGraph(
		ctx: CanvasRenderingContext2D,
		graphOptions: { yScale: number; xScale: number; xBounds: number; yBounds: number },
		yAxisIndex: number
	) {
		goldDiff.goldDiffValues.forEach((g, i) => {
			const prevValue = goldDiff.goldDiffValues[i - 1];
			const prevIndex = i - 1;

			// Skip the first value, since there is no previous point available to draw from.
			if (i !== 0) {
				drawLine(
					ctx,
					graphOptions.xScale,
					graphOptions.yScale,
					yAxisIndex,
					prevValue,
					g,
					prevIndex,
					i,
					3,
					getLineColour(g)
				);
			}

			// draw a horizontal line for each 5th minute
			if (i !== 0 && i % 5 === 0) {
				drawLine(
					ctx,
					graphOptions.xScale,
					graphOptions.yScale,
					yAxisIndex,
					goldDiff.lowestValue,
					goldDiff.highestValue,
					i,
					i,
					1,
					'grey'
				);
			}

			// Add a x axis label every 10 minute mark
			if (i % 10 === 0) {
				ctx.textAlign = 'center';
				ctx.fillStyle = 'white';
				ctx.fillText(
					i.toString(),
					Math.floor(i * graphOptions.xScale) + graphOptions.xBounds / 2,
					Math.floor(goldDiff.highestValue * graphOptions.yScale) + graphOptions.yBounds
				);
			}
		});
	}
</script>

<canvas
	class="h-62.25 w-full"
	bind:this={canvas}
	bind:clientHeight={graphHeight}
	bind:clientWidth={graphWidth}
>
</canvas>
