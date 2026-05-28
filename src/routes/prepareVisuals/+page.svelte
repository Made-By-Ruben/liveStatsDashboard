<script lang="ts">
	import SpotlightVisual from '$lib/components/SpotlightVisual.svelte';
	import type { PageProps } from './$types';
	import Logo from '$lib/assets/icon2026.png';
	import CustomisingCard from '$lib/components/ui/CustomisingCard.svelte';
	import DropDown from '$lib/components/ui/DropDown.svelte';

	let { data }: PageProps = $props();
	let selectedTeam = $state('BAN');
	let selectedPlayer = $state('Top');
	let selectedStats = $state<[string, number][]>([]);
	let statsSelectionCap = $derived(selectedStats.length >= 4);

	let matchConfig = $derived<{
		isCustom: boolean;
		visualFormat: string;
		requestedPlayer: string[];
		requestedStats: [string, number][];
	}>({
		isCustom: true,
		visualFormat: 'SPOTLIGHT',
		requestedPlayer: [selectedTeam + ' ' + selectedPlayer],
		requestedStats: selectedStats
	});

	function addStat(stat: string) {
		selectedStats.push([stat, 999]);
	}

	function removeStat(i: number) {
		selectedStats.splice(i, 1);
	}
</script>

<div class="flex h-screen w-full flex-col items-center gap-5 bg-brand-dark-1 text-brand-text">
	<header
		class="flex h-20 w-full items-center justify-between border-b border-brand-primary-1 bg-brand-primary-3 p-4"
	>
		<img class="h-[80%]" src={Logo} alt="ROL" />

		<button
			class="rounded-md bg-brand-highlight-1 px-4 py-3 font-label text-2xl font-bold tracking-wider text-brand-dark-1 uppercase shadow-lg shadow-brand-highlight-1/10 transition-colors hover:bg-brand-highlight-1/80"
		>
			Export Visual
		</button>
	</header>

	<div
		class="flex h-62.5 w-334.5 shrink-0 flex-col border border-brand-border bg-[url(/src/lib/assets/croppedBg.avif)]"
	>
		<SpotlightVisual
			champName={'Ryze'}
			role={selectedPlayer}
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
					{#each Array(4) as _, i (i)}
						{@const entry = selectedStats[i]}
						{#if entry}
							<div class="relative border border-brand-border p-5 wrap-break-word">
								<button
									type="button"
									aria-label="Remove stat"
									onclick={() => removeStat(i)}
									class="absolute top-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm text-brand-text/60 transition-colors hover:bg-brand-primary-3 hover:text-brand-text"
								>
									×
								</button>
								<span
									class=" items-center gap-1 font-label leading-none tracking-widest text-brand-text"
								>
									<span class="text-brand-highlight-1">{i + 1}</span>
									<span>{entry[0]}</span>
								</span>
							</div>
						{:else}
							<div class="border border-brand-primary-1/50 p-5 text-brand-text/50">Select a stat</div>
						{/if}
					{/each}
				</div>
			{/snippet}
		</CustomisingCard>

		<CustomisingCard title={'Choose Statistics'}>
			{#snippet children()}
				<div class="grid w-full flex-1 border-l border-brand-primary-1/50">
					{#each data.allowedStats as { value, label }}
						<button
							onclick={() => addStat(value)}
							disabled={statsSelectionCap}
							class={[
								'cursor-pointer border border-brand-primary-1/50 p-5 text-left font-label tracking-wide transition-colors hover:bg-brand-primary-3 disabled:bg-gray-600'
							]}
						>
							{label}
						</button>
					{/each}
				</div>
			{/snippet}
		</CustomisingCard>
	</div>
</div>
