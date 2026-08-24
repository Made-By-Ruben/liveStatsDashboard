<script lang="ts">
	import type { FinishedGameMetaInfo, LiveGameMetaInfo, TeamInfo } from "$lib/types/postGameStats";
	import StatBadgeV2 from "../StatBadgeV2.svelte";

    let {team100, team200, meta}: {team100: TeamInfo, team200: TeamInfo, meta: FinishedGameMetaInfo | LiveGameMetaInfo} = $props()
</script>

<div class="flex h-full w-full items-center justify-evenly border border-brand-border p-5">
	<h1
		class="postGameHeader"
		style={team100.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
	>
		{team100.teamName}
	</h1>
	<p
		class="font-label text-4xl font-bold text-brand-off-white/90"
		style={team100.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
	>
		{team100.teamHasWon ? 'WIN' : 'LOSS'}
	</p>
	<h1 class="postGameHeader">	<StatBadgeV2 stat={team100.teamScore} /></h1>
</div>

<div class="flex w-full flex-col items-center border border-brand-border p-5">
	<h1 class="postGameHeader">{meta.gameTimeDisplay}</h1>
	<p class="font-label text-4xl font-bold text-brand-off-white/90">GAMETIME</p>
</div>

<div class="flex h-full w-full items-center justify-evenly border border-brand-border p-5">
	<h1 class="postGameHeader"><StatBadgeV2 stat={team200.teamScore} /></h1>
	<p
		class="font-label text-4xl font-bold text-brand-off-white/90"
		style={team200.teamHasWon ? 'color: var(--color-brand-highlight-1);' : ''}
	>
		{team200.teamHasWon ? 'WIN' : 'LOSS'}
	</p>
	<h1 class="postGameHeader">{team200.teamName}</h1>
</div>
