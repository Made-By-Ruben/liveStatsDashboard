<script lang="ts">
	import SpotlightVisual from '$lib/components/SpotlightVisual.svelte';
	import type { PageProps } from './$types';
	import Logo from '$lib/assets/jaar + logo.png';
	import CustomisingCard from '$lib/components/ui/CustomisingCard.svelte';
	import DropDown from '$lib/components/ui/DropDown.svelte';

	let { data }: PageProps = $props();
	let selectedTeams = $state(['BAN', 'FEC']);

	let matchConfig = $state<{
		isCustom: boolean;
		visualFormat: string;
		playerRole: string;
		requestedPlayer: string[];
		requestedStats: [string, number][];
	}>({
		isCustom: true,
		visualFormat: 'SPOTLIGHT',
		playerRole: '',
		requestedPlayer: [],
		requestedStats: []
	});

	$inspect(matchConfig)

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
		<div class="flex gap-2 font-label">
			{#each selectedTeams, i}
				<DropDown bind:value={selectedTeams[i]} items={data.teams} />
			{/each}
		</div>

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
	<div class="grid min-h-0 w-334.5 flex-1 grid-cols-2 gap-5 pb-5">
		<CustomisingCard title={'Select Player'}>
			{#snippet children()}
				{#each selectedTeams as selectedTeam}
					<div class="grid w-full border-l border-brand-blue/50">
						<div
							class="border border-brand-blue/50 bg-royal/50 p-5 font-heading text-2xl tracking-widest text-lime"
						>
							{selectedTeam}
						</div>

						{#each data.roles as { value, label }, i}
							{@const isSelected = matchConfig.requestedPlayer[0] === selectedTeam + ' ' + value}
							<button
								onclick={() => {
									matchConfig.playerRole = value;
									matchConfig.requestedPlayer[0] = selectedTeam + ' ' + value;
								}}
								class={[
									'cursor-pointer border border-brand-blue/50 p-5 text-left font-heading text-xl tracking-wide transition-colors hover:bg-royal',
									isSelected && ' border-lime'
								]}
							>
								{selectedTeam + ' ' + label}
							</button>
						{/each}
					</div>
				{/each}
			{/snippet}
		</CustomisingCard>

		<CustomisingCard title={'Select Statistics'}>
			{#snippet children()}
				<div class="flex h-full w-full flex-col">
					<div class="grid grid-cols-4 p-5">
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
