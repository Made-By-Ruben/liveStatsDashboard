<script lang="ts">
	import SpotlightVisual from '$lib/components/SpotlightVisual.svelte';
	import type { PageProps } from './$types';
	import Logo from '$lib/assets/jaar + logo.png';
	import CustomisingCard from '$lib/components/ui/CustomisingCard.svelte';
	import DropDown from '$lib/components/ui/DropDown.svelte';

	let { data }: PageProps = $props();
	let selectedTeam = $state('BAN');
	let selectedPlayer = $state('Top');

	let matchConfig = $derived<{
		isCustom: boolean;
		visualFormat: string;
		playerRole: string;
		requestedPlayer: string[];
		requestedStats: [string, number][];
	}>({
		isCustom: true,
		visualFormat: 'SPOTLIGHT',
		playerRole: selectedPlayer,
		requestedPlayer: [selectedTeam + ' ' + selectedPlayer],
		requestedStats: []
	});

	let statsSelectionCap = $derived(matchConfig.requestedStats.length >= 4);
	let statsSelectionAmount = $derived(matchConfig.requestedStats.length);

	function addStat(stat: string) {
		matchConfig.requestedStats.push([stat, 999]);
	}
</script>

<div class="flex h-screen w-full flex-col items-center gap-5 bg-night text-off-white">
	<header
		class="flex h-20 w-full items-center justify-between border-b border-brand-blue bg-royal p-4"
	>
		<img class="h-[80%]" src={Logo} alt="ROL" />

		<button
			class="rounded-md bg-lime px-4 py-3 font-label text-2xl font-bold tracking-wider text-night uppercase shadow-lg shadow-lime/10 transition-colors hover:bg-lime/80"
		>
			Export Visual
		</button>
	</header>

	<div
		class="flex h-62.5 w-334.5 shrink-0 flex-col border border-border-blue bg-[url(/src/lib/assets/croppedBg.avif)]"
	>
		<SpotlightVisual
			champName={'Ryze'}
			role={matchConfig.playerRole}
			playerName={matchConfig.requestedPlayer}
			statEntries={matchConfig.requestedStats}
		/>
	</div>
	<div class="grid min-h-0 w-334.5 flex-1 gap-5 pb-5">
		<div class="flex w-full gap-2">
			<div class="flex w-1/2">
				<span>Select Team</span>
				<DropDown bind:value={selectedTeam} items={data.teams} />
			</div>
			<div class="flex w-1/2">
				<span>Select Role</span>
				<DropDown bind:value={selectedPlayer} items={data.roles} />
			</div>
		</div>

		<CustomisingCard title={'Selected Stats'}>
			{#snippet children()}
				<div class="grid h-full w-full grid-cols-4 p-5">
					{#if statsSelectionAmount === 0}
						<div class="border border-brand-blue/50 p-5">Select a stat</div>
					{:else}
						{#each matchConfig.requestedStats as [statName, value], i}
							<div class="relative border border-border-blue p-5 wrap-break-word">
								<button
									onclick={() => matchConfig.requestedStats[i].pop()}
									class="absolute top-0 left-[90%]">x</button
								>
								<span
									class=" items-center gap-1 font-label leading-none tracking-widest text-off-white"
								>
									<span class="text-lime">{i + 1}</span>
									<span>{statName}</span>
								</span>
							</div>
						{/each}
					{/if}
				</div>
			{/snippet}
		</CustomisingCard>

		<CustomisingCard title={'Choose Statistics'}>
			{#snippet children()}
				<div class="flex h-full w-full flex-col">
					<div class="grid w-full flex-1 border-l border-brand-blue/50">
						{#each data.allowedStats as { value, label }}
							<button
								onclick={() => addStat(value)}
								disabled={statsSelectionCap}
								class={[
									'cursor-pointer border border-brand-blue/50 p-5 text-left font-label tracking-wide transition-colors hover:bg-royal disabled:bg-gray-600'
								]}
							>
								{label}
							</button>
						{/each}
					</div>
				</div>
			{/snippet}
		</CustomisingCard>
	</div>
</div>
