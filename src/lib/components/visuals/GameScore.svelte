<script lang="ts">
	import type { FinishedGameMetaInfo, LiveGameMetaInfo, TeamInfo } from "$lib/types/postGameStats";
	import { getTeamIcon } from "$lib/visualAssetsConfig";
	import StatBadgeV2 from "../StatBadgeV2.svelte";

    let {team100, team200, meta, visualStyle}: {team100: TeamInfo, team200: TeamInfo, meta: FinishedGameMetaInfo | LiveGameMetaInfo, visualStyle: string|undefined} = $props()
	let team100Icon = $derived(getTeamIcon(visualStyle, team100.teamName, team100.teamHasWon))
	let team200Icon = $derived(getTeamIcon(visualStyle, team200.teamName, team200.teamHasWon))
</script>

<div class="flex h-full w-full items-center justify-evenly border border-brand-border">
	{#if team100Icon}
		<img class="size-25" src={team100Icon} alt={team100.teamName} />
	{/if}
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

<div class="flex w-1/4 flex-col items-center border border-brand-border p-5">
	<p class="font-label text-2xl font-bold text-brand-off-white/90">GAMETIME</p>
	<h1 class="postGameHeader text-7xl">{meta.gameTimeDisplay}</h1>
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
	{#if team200Icon}
		<img class="size-25" src={team200Icon} alt={team200.teamName} />
	{/if}
</div>
