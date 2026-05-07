<script lang="ts">
	import SpotlightVisual from '$lib/components/SpotlightVisual.svelte';
	import type { PageProps } from './$types';
	import Logo from '$lib/assets/jaar + logo.png';

	let { data }: PageProps = $props();

	const teams = ['BAN', 'DYN', 'FEC', 'MCON', 'MYTH', 'OUAT', 'SNSH', 'ZNT'];
	const roles = ['Top', 'Jungle', 'Middle', 'Bottom', 'Support'];

	let selectedTeams = $state(['BAN', 'FEC']);

	let matchConfig = $state({
		isCustom: true,
		visualFormat: 'SPOTLIGHT',
		requestedPlayer: ['Select a player'],
		requestedStats: []
	});

	$inspect(matchConfig);
</script>

<div class="flex h-screen w-full flex-col bg-night text-off-white">
	<header
		class="flex h-[7%] w-full items-center justify-between border-b border-brand-blue bg-royal p-4"
	>
		<img class="h-[80%]" src={Logo} />
		<div class="flex gap-2 font-label">
			{#each selectedTeams, i}
				<select
					class="rounded border border-brand-blue bg-egyptian/50 px-2 py-1"
					name="team1"
					id="team1-select"
					bind:value={selectedTeams[i]}
				>
					{#each teams as team}
						<option value={team} class="">
							<span class="">Team {i + 1}</span>
							{team}
						</option>
					{/each}
				</select>
			{/each}
		</div>

		<button
			class="rounded-md bg-lime px-4 py-3 font-label text-2xl font-bold tracking-wider text-night uppercase shadow-lg shadow-lime/10 transition-colors hover:bg-lime/80"
		>
			Export Visual
		</button>
	</header>

	<main class="flex h-full w-full">
		<div class="h-full w-full flex-col p-5 items-center justify-center ">
			<!-- <SpotlightVisual
                champName={data.spotlightedPlayer.championName}
                role={data.spotlightedPlayer.role}
                playerName={data.spotlightedPlayer.playerName}
                {statEntries}
            /> -->

			<!-- Select Player section -->
			<div class="flex flex-col items-center rounded border border-brand-blue bg-royal/50">
				<header
					class="w-full border-b border-brand-blue bg-royal p-4 font-heading text-2xl tracking-widest"
				>
					Select Player for visual
				</header>

				<div class="m-5 flex w-[90%]">
					{#each selectedTeams as selectedTeam}
						<div class="grid w-full border-l border-brand-blue/50">
							<div
								class="border border-brand-blue/50 bg-royal/50 p-5 font-heading text-2xl tracking-widest text-lime"
							>
								{selectedTeam}
							</div>

							{#each roles as role, i}
								{@const isSelected = matchConfig.requestedPlayer[0] === selectedTeam + ' ' + role}
								<button
									onclick={() => (matchConfig.requestedPlayer[0] = selectedTeam + ' ' + role)}
									class={[
										'cursor-pointer border border-brand-blue/50 p-5 text-left font-heading text-xl tracking-wide transition-colors hover:bg-royal',
										isSelected && ' border-lime'
									]}
								>
									{selectedTeam + ' ' + role}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<!-- Select Statistics section -->
			<div></div>
		</div>
	</main>
</div>
