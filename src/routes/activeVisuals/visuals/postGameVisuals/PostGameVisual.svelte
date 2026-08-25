<script lang="ts">
	import type { ApiResponse } from '$lib/types/api';
	import type { PostMatchStats } from '$lib/types/postGameStats';

	import redBullLogo from '$lib/assets/shared/redBullLogo.avif';
	import kitKatLogo from '$lib/assets/shared/kitKatLogo.svg';
	import GoldDiffGraph from '../goldDiffGraph/GoldDiffGraph.svelte';
	import TotalDamageDone from '../totalDmgVisual/TotalDamageDone.svelte';
	import ComparisonRows from './components/ComparisonRows.svelte';
	import GameScore from './components/GameScore.svelte';

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
		<GameScore {meta} {team100} {team200} {visualStyle} />
	</section>

	<section class="flex h-full w-full justify-between gap-2.5">
		<div class="h-full w-2/5">
			<ComparisonRows {comparisonRows} {team100} {team200} />
		</div>

		<div class="flex w-3/5 flex-col gap-2">
			<div class="w-full border border-brand-border text-center">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">
					DAMAGE DEALT TO CHAMPIONS
				</h1>
				<TotalDamageDone
					data={data.data.totalDamageDone}
					isPostGame={true}
					team100Won={team100.teamHasWon}
				/>
			</div>

			<div class="border border-brand-border bg-black/50 text-center">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">
					GOLD DIFFERENCE OVER TIME
				</h1>
				<GoldDiffGraph {goldDiff} team100Won={team100.teamHasWon} {visualStyle} />
			</div>

			<div class="flex h-full items-center justify-evenly border border-brand-border">
				<img class="h-40" src={redBullLogo} />
				<img class="h-40" src={kitKatLogo} />
			</div>
		</div>
	</section>
</main>
