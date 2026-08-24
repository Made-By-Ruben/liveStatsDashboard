<script lang="ts">
	import type { GoldDiffGraph } from '$lib/types/postGameStats';
	import { onMount } from 'svelte';
	let { goldDiff, team100Won, visualStyle }: { goldDiff: GoldDiffGraph; team100Won: boolean | null, visualStyle: string | undefined } = $props();

	type GraphOptions = {
		xScale: number;
		yScale: number;
		xBounds: number;
		yBounds: number;
	};

	let canvas: HTMLCanvasElement | null = $state(null);
	let graphWidth = $state(0);
	let graphHeight = $state(0);
	let xBounds = $derived(graphWidth * 0.2);
	let yBounds = $derived(graphHeight * 0.3);

	function scaleValueToGraph(
		value: number,
		yAxisIndex: number,
		scale: number,
		xOrY: 'x' | 'y',
		placementPerc: number
	) {
		// value * scale + bounds / percentage
		const scaledValue = value * scale;

		if (xOrY === 'x') {
			const placementPercentage = xBounds * placementPerc;
			const placementValue = scaledValue + placementPercentage;
			return Math.floor(placementValue);
		} else {
			const placementPercentage = yBounds * placementPerc + yAxisIndex;
			const placementValue = scaledValue + placementPercentage;
			return placementValue;
		}
	}

	onMount(() => {
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (ctx === null) {
			return;
		}

		let graphOptions: GraphOptions = {
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
		const x1 = scaleValueToGraph(fromX, yAxisIndex, xScale, 'x', 0.5);
		const y1 = scaleValueToGraph(fromY, yAxisIndex, yScale, 'y', 0.25);
		const x2 = scaleValueToGraph(toX, yAxisIndex, xScale, 'x', 0.5);
		const y2 = scaleValueToGraph(toY, yAxisIndex, yScale, 'y', 0.25);

		ctx.lineWidth = lineThickness;
		ctx.strokeStyle = colour;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();
	}

	function drawXAxis(
		ctx: CanvasRenderingContext2D,
		graphOptions: GraphOptions,
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
		graphOptions: GraphOptions,
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
		ctx.font = '25px arial';
		ctx.fillText(
			(goldDiff.lowestValue * -1).toString(),
			scaleValueToGraph(0, yAxisIndex, graphOptions.xScale, 'x', 0.25),
			scaleValueToGraph(goldDiff.lowestValue, yAxisIndex, graphOptions.yScale, 'y', 0.25)
		);

		ctx.fillStyle = getLineColour(goldDiff.highestValue);
		ctx.fillText(
			goldDiff.highestValue.toString(),
			scaleValueToGraph(goldDiff.goldDiffValues.length, yAxisIndex, graphOptions.xScale, 'x', 0.75),
			scaleValueToGraph(goldDiff.highestValue, yAxisIndex, graphOptions.yScale, 'y', 0.25)
		);
	}

	function getLineColour(g: number) {
		if (team100Won) {
			if (visualStyle === 'NLC') {
				return g >= 0 ? '#EFBF04' : 'white';
			} else {
				return g >= 0 ? '#d3fe31' : 'white'; 
			}
		} else {
			if (visualStyle === 'NLC') {
				return g >= 0 ? 'white' : '#EFBF04';
			} else {
				return g >= 0 ? 'white' : '#d3fe31';
			}
		}
	}

	function fillGraph(
		ctx: CanvasRenderingContext2D,
		graphOptions: GraphOptions,
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
				ctx.font = '20px arial';
				ctx.fillText(
					i.toString(),
					scaleValueToGraph(i, yAxisIndex, graphOptions.xScale, 'x', 0.5),
					scaleValueToGraph(goldDiff.highestValue, yAxisIndex, graphOptions.yScale, 'y', 0.5)
				);
			}
		});
	}
</script>

<canvas
	class="h-62.25 w-full overflow-hidden"
	bind:this={canvas}
	bind:clientHeight={graphHeight}
	bind:clientWidth={graphWidth}
>
</canvas>
