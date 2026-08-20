<script lang="ts">
	import TotalDamageDone from './TotalDamageDone.svelte';

	type FinishedGameMetaInfo = {
		gameState: 'finished';
		winningTeam: 100 | 200;
		gameID: number;
		gameTimeSec: number;
		gameTimeDisplay: string;
	};

	type LiveGameMetaInfo = {
		gameState: 'live';
		gameID: number;
		gameTimeSec: number;
		gameTimeDisplay: string;
	};

	type TeamInfo = {
		teamName: string;
		teamServerID: number;
		teamScore: number;
		teamHasWon: boolean | null;
	};

	type ScalarRow = {
		kind: 'scalar';
		label: string;
		team100Value: {
			raw: number;
			display: string;
		};
		team200Value: {
			raw: number;
			display: string;
		};
	};

	type BansRow = {
		kind: 'bans';
		label: string;
		team100Value: string[];
		team200Value: string[];
	};

	type KDARow = {
		kind: 'KDA';
		label: string;
		team100Value: {
			kills: number;
			deaths: number;
			assists: number;
			display: string;
		};
		team200Value: {
			kills: number;
			deaths: number;
			assists: number;
			display: string;
		};
	};

	type FilteredPlayerData = {
		playerName: string;
		championName: string;
		teamID: number;
		filteredStats: Record<string, number>;
	};

	type ComparisonRow = ScalarRow | BansRow | KDARow;

	type GoldDiffGraph = {
		lowestValue: number;
		highestValue: number;
		goldDiffValues: number[];
	};

	type PostMatchStats = {
		meta: FinishedGameMetaInfo | LiveGameMetaInfo;
		teams: {
			100: TeamInfo;
			200: TeamInfo;
		};
		comparisonRows: ComparisonRow[];
		totalDamageDone: {
			100: FilteredPlayerData[];
			200: FilteredPlayerData[];
		};
		goldDiffGraph: GoldDiffGraph;
	};

	type PropsStructure = {
		success: boolean;
		message: string;
		data: PostMatchStats;
	};
	let { data, visualStyle }: { data: PropsStructure; visualStyle: string | undefined } = $props();
	$inspect(data.data);

	let team100 = $derived(data.data.teams[100]);
	let team200 = $derived(data.data.teams[200]);
	let comparisonRows = $derived(data.data.comparisonRows);
	let meta = $derived(data.data.meta);
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

	<section class="grid h-full grid-cols-2 gap-2.5">
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
		<div>
			<div class="border border-brand-border text-center">
				<h1 class="font-label text-3xl font-bold text-brand-off-white/90">DAMAGE DEALT TO CHAMPIONS</h1>
				<TotalDamageDone data={data.data.totalDamageDone} isPostGame={true} />
			</div>
		</div>
	</section>
</main>
