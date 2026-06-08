<script lang="ts">
	import type { Visual } from '$lib/server/schemas';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let editVisual = $state(false);
	let editStats = $state(false);
	let selectedVisual = $state<Visual | null>(null);
	let statsAmount = $derived(selectedVisual?.visualConfig.requestedStats.length);

	$inspect(statsAmount);

	function handleClick(visual: Visual) {
		editVisual = true;
		selectedVisual = visual;
	}

	function toggleStat(stat: string) {
		if (selectedVisual === null) {
			return;
		}
		const stats = selectedVisual.visualConfig.requestedStats;
		if (stats.includes(stat)) {
			const filteredArray = stats.filter((e) => e !== stat);
			selectedVisual.visualConfig.requestedStats = [...filteredArray];
			return;
		}
		selectedVisual.visualConfig.requestedStats = [...stats, stat];
		return;
	}

	$inspect(selectedVisual);
</script>

<main class="h-screen w-full bg-brand-primary-3">
	{#if !editVisual}
		<table class="border border-brand-border text-brand-off-white" in:fade={{ duration: 200 }}>
			<thead>
				<tr>
					<th>Visual ID</th>
					<th>Visual Name</th>
					<th>Selected Stats</th>
				</tr>
			</thead>

			<tbody>
				{#each data.visuals as visual}
					<tr onclick={() => handleClick(visual)}>
						<td>{visual.visualID}</td>
						<td>{visual.visualLabel}</td>
						<td>{visual.visualConfig.requestedStats[0]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else if editVisual && selectedVisual !== null}
		<form
			method="POST"
			class="flex flex-col border border-brand-border text-brand-off-white"
			in:fade={{ duration: 200 }}
		>
			<label class="font-bold" for="visualLabel">Select a name for your visual:</label>
			<input
				id="visualLabel"
				type="text"
				placeholder={selectedVisual.visualLabel}
				bind:value={selectedVisual.visualLabel}
			/>

			<label class="font-bold" for="visualTeam">Select a team for your visual:</label>
			<select bind:value={selectedVisual.visualConfig.selectedTeam}>
				{#each data.teams as team}
					<option value={team.value}>{team.label}</option>
				{/each}
			</select>

			<label class="font-bold" for="visualTeam"
				>Which role for {selectedVisual.visualConfig.selectedTeam}?:</label
			>
			<select bind:value={selectedVisual.visualConfig.selectedRole}>
				{#each data.roles as role}
					<option value={role.value}>{role.label}</option>
				{/each}
			</select>

			{#if !editStats}
				<button onclick={() => (editStats = true)} in:fade={{ duration: 200 }}>
					Select Stats
				</button>
			{:else}
				<div class="w-fit px-5 border border-brand-border shadow-2xl" in:fade={{ duration: 200 }}>
					<button onclick={() => (editStats = false)}>Save</button>
					<ul class="max-h-32 overflow-scroll ">
						{#each data.allowedStats as allowedStat}
							{@const selected = selectedVisual.visualConfig.requestedStats.includes(
								allowedStat.value
							)}
							{@const isBlocked =
								selectedVisual.visualConfig.requestedStats.length >= 4 && !selected}
							<li>
								<label>
									<input
										type="checkbox"
										disabled={isBlocked}
										checked={selected}
										onchange={() => toggleStat(allowedStat.value)}
									/>
									{allowedStat.label}
								</label>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</form>
	{/if}
</main>
