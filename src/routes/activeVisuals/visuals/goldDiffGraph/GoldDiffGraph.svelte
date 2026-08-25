<script lang="ts">
	import type { GoldDiffGraph } from '$lib/types/postGameStats';
	import { onMount } from 'svelte';
	let {goldDiff, team100Won, visualStyle}: { goldDiff: GoldDiffGraph; team100Won: boolean | null; visualStyle: string | undefined } = $props();

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
	
	onMount(() => {
		if (!canvas) {
			return;
		}
		canvas.width = graphWidth;
		canvas.height = graphHeight;

		const ctx = canvas.getContext('2d');
		if (ctx === null) {
			return;
		}

		createGraph(ctx);
	});

	function createGraph(ctx: CanvasRenderingContext2D){
		let graphOptions: GraphOptions = {
			xScale: (graphWidth - xBounds) / goldDiff.goldDiffValues.length,
			yScale: (graphHeight - yBounds) / (goldDiff.highestValue - goldDiff.lowestValue),
			xBounds: xBounds,
			yBounds: yBounds
		};
		let yAxisIndex = goldDiff.highestValue * graphOptions.yScale;

		drawYAxis(ctx, graphOptions, yAxisIndex);
		drawXAxis(ctx, graphOptions, yAxisIndex);
		drawLine(ctx, graphOptions.xScale, graphOptions.yScale, yAxisIndex, 0, 0, 0, goldDiff.goldDiffValues.length, 2, 'grey');
		fillGraph(ctx, yAxisIndex, graphOptions);
	}

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

	function fillGraph(ctx: CanvasRenderingContext2D, yAxisIndex: number, graphOptions: GraphOptions) {
		ctx.lineWidth = 3;
		ctx.save();
		ctx.beginPath();

		const area = new Path2D();
		goldDiff.goldDiffValues.forEach((g, i) => {
			const X = (i: number) => scaleValueToGraph(i, yAxisIndex, graphOptions.xScale, 'x', 0.5);
			const Y = (g: number) => scaleValueToGraph(g * -1, yAxisIndex, graphOptions.yScale, 'y', 0.25);

			const highestValue = goldDiff.highestValue;
			const lowestValue = goldDiff.lowestValue;
			if (i === 0) {
				area.moveTo(X(i), Y(g));
			}
			area.lineTo(X(i), Y(g));

			// draw a horizontal line for each 5th minute
			if (i !== 0 && i % 5 === 0) {
				drawLine(
					ctx,
					graphOptions.xScale,
					graphOptions.yScale,
					goldDiff.lowestValue * graphOptions.yScale * -1,
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
					scaleValueToGraph(i, goldDiff.lowestValue * graphOptions.yScale * -1, graphOptions.xScale, 'x', 0.5),
					scaleValueToGraph(goldDiff.highestValue, goldDiff.lowestValue * graphOptions.yScale * -1, graphOptions.yScale, 'y', 0.5)
				);
			}

			if (i === goldDiff.goldDiffValues.length - 1) {
				
				area.lineTo(X(i), Y(0));
				area.closePath();
				ctx.save();
				ctx.clip(area);
				
				const gradient = ctx.createLinearGradient(graphWidth/2, Y(lowestValue), graphWidth/2, Y(highestValue));
				const z = (Y(0) - Y(lowestValue)) / (Y(highestValue) - Y(lowestValue));
				gradient.addColorStop(0, getColor(200));
				gradient.addColorStop(z, getColor(200) + '25');
				gradient.addColorStop(z, getColor(100) + '25');
				gradient.addColorStop(1, getColor(100))
				
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, graphWidth, graphHeight);
				const lineGradient = ctx.createLinearGradient(graphWidth/2, Y(lowestValue), graphWidth/2, Y(highestValue))
				lineGradient.addColorStop(0, getColor(200));
				lineGradient.addColorStop(z, getColor(200));
				lineGradient.addColorStop(z, getColor(100));
				lineGradient.addColorStop(1, getColor(100));
				ctx.lineWidth = 5;
				ctx.strokeStyle = lineGradient
				ctx.stroke(area);
				ctx.restore();
			}
		});
	}

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
		ctx.fill();
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
			goldDiff.lowestValue * graphOptions.yScale * -1,
			goldDiff.highestValue,
			goldDiff.highestValue,
			0,
			goldDiff.goldDiffValues.length,
			2,
			'white'
		);
	}

	function drawYAxis(ctx: CanvasRenderingContext2D, graphOptions: GraphOptions, yAxisIndex: number) {
		drawLine(
			ctx,
			graphOptions.xScale,
			graphOptions.yScale,
			goldDiff.lowestValue * graphOptions.yScale * -1,
			goldDiff.lowestValue,
			goldDiff.highestValue,
			0,
			0,
			2,
			'white'
		);

		ctx.textAlign = 'center';
		ctx.font = '25px arial';
		
		ctx.fillStyle = getColor(200);
		ctx.fillText(
			(goldDiff.lowestValue * -1).toString(),
			scaleValueToGraph(0, (goldDiff.lowestValue * graphOptions.yScale * -1), graphOptions.xScale, 'x', 0.25),
			scaleValueToGraph(goldDiff.highestValue, (goldDiff.lowestValue * graphOptions.yScale * -1) + 12.5, graphOptions.yScale, 'y', 0.25)
		);

		ctx.fillStyle = getColor(100);
		ctx.fillText(
			goldDiff.highestValue.toString(),
			scaleValueToGraph(goldDiff.goldDiffValues.length, goldDiff.lowestValue * graphOptions.yScale * -1, graphOptions.xScale, 'x', 0.75),
			scaleValueToGraph(goldDiff.lowestValue, (goldDiff.lowestValue * graphOptions.yScale * -1) + 12.5, graphOptions.yScale, 'y', 0.25)
		);
	}

	function getColor(team: 100 | 200) {
		if (team100Won) {
			if (visualStyle === 'NLC') {
				return team === 100 ? '#EFBF04' : '#FFFFFF';
			} else {
				return team === 100 ? '#d3fe31' : '#FFFFFF';
			}
		} else {
			if (visualStyle === 'NLC') {
				return team === 200 ? '#FFFFFF' : '#EFBF04';
			} else {
				return team === 200 ? '#FFFFFF' : '#d3fe31';
			}
		}
	}
</script>

<canvas
	class="h-62.25 w-full overflow-hidden"
	bind:this={canvas}
	bind:clientHeight={graphHeight}
	bind:clientWidth={graphWidth}
>
</canvas>