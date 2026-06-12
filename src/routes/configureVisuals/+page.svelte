<script lang="ts">
	import type { Visual } from '$lib/server/schemas';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import EditVisual from '$lib/components/visuals/EditVisual.svelte';
	import { onMount } from 'svelte';
	import { getVisualStyle } from '$lib/utils/getVisualStyle';

	let { data }: PageProps = $props();
	let editVisual = $state(false);
	let editStats = $state(false);
	let selectedVisual = $state<Visual | null>(null);
	let loading = $state(false);
	let visualStyle = $state<string>();

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

	function createCompanionConfig() {
		// TODO
	}

	onMount(() => {
		visualStyle = getVisualStyle();
	});
</script>

<main class="min-h-screen w-full bg-brand-primary-3 py-5 px-10 flex-col justify-center items-center">
	<div class="flex h-[10%] w-full items-center justify-between text-brand-off-white">
		<div>
			<h1 class="font-heading text-5xl">{editVisual ? "Editing" : "Your Visuals"}</h1>
			<h2 class="font-label text-2xl italic">{editVisual ? "Configure this visual": "10 configured visuals - click any one to edit it"}</h2>
		</div>
		{#if !editVisual}
			<button in:fade={{ duration: 200 }} class="ctaButton" onclick={() => createCompanionConfig()}
				>Export Bitfocus Configuration</button
			>
		{:else}
			<button in:fade={{ duration: 200 }} class="ctaButton" onclick={() => editVisual = false}
				>Back to overview</button
			>
		{/if}
	</div>
	{#if !editVisual}
		<div class="grid h-[90%] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" in:fade={{ duration: 200 }}>
			{#each data.visuals as visual}
				<button
					onclick={() => handleClick(visual)}
					class="group flex cursor-pointer flex-col items-baseline justify-between rounded border border-brand-border p-5 text-brand-off-white transition-all hover:border-brand-highlight-1 hover:shadow-2xl"
				>
					<div class="flex w-full justify-between font-label">
						<p class="">{'Visual: ' + visual.visualID}</p>
						<p>{visual.visualConfig.selectedTeam} {visual.visualConfig.selectedRole}</p>
					</div>

					<h1 class="font-heading text-3xl font-bold">{visual.visualLabel}</h1>

					<div class="flex w-full justify-between font-label">
						<p class="rounded bg-brand-highlight-1 px-5 font-label text-brand-dark-1">
							Stats: {visual.visualConfig.requestedStats.length}
						</p>
						<p class="invisible font-label text-xs text-brand-off-white/80 group-hover:visible">
							Edit
						</p>
					</div>
				</button>
			{/each}
		</div>
	{:else if editVisual && selectedVisual !== null}
		<form
			method="POST"
			class="flex flex-col items-center gap-5 border border-brand-border text-brand-off-white p-10"
			in:fade={{ duration: 200 }}
			use:enhance={() => {
				loading = true;
				return async ({ result, update }) => {
					loading = false;
					editVisual = false;
					update();
				};
			}}
		>
			<div
				class={[
					'flex h-62.25 w-334.25 flex-col border border-brand-border',
					visualStyle === 'ROL' && 'bg-[url(/src/lib/assets/rol/croppedBg.avif)]',
					visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcCroppedBg.avif)]'
				]}
			>
				<EditVisual {visualStyle} data={selectedVisual.visualConfig} />
			</div>
			<div class="flex w-full flex-col gap-5">
				<input hidden name="selectedVisual" value={JSON.stringify(selectedVisual)} type="text" />

				<label class="inputLabel"
					>Visual Name: <input
						class="input"
						id="visualLabel"
						type="text"
						placeholder={selectedVisual.visualLabel}
						bind:value={selectedVisual.visualLabel}
					/></label
				>

				<div class="flex w-full gap-2">
					<label class="inputLabel w-1/2"
						>Team: <select
							bind:value={selectedVisual.visualConfig.selectedTeam}
							class="input"
						>
							{#each data.teams as team}
								<option value={team.value}>{team.label}</option>
							{/each}
						</select></label
					>

					<label class="inputLabel w-1/2"
						>Which role for {selectedVisual.visualConfig.selectedTeam}?:
						<select bind:value={selectedVisual.visualConfig.selectedRole} class="input">
							{#each data.roles as role}
								<option value={role.value}>{role.label}</option>
							{/each}
						</select></label
					>
				</div>

				{#if !editStats}
					<button onclick={() => (editStats = true)} in:fade={{ duration: 200 }}>
						Select Stats
					</button>
				{:else}
					<div class="w-fit border border-brand-border px-5 shadow-2xl" in:fade={{ duration: 200 }}>
						<button onclick={() => (editStats = false)}>Save</button>
						<ul class="max-h-32 overflow-scroll">
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

				{#if loading}
					<div in:fade={{ duration: 200 }} class="ctaButton">Loading...</div>
				{:else}
					<button in:fade={{ duration: 200 }} type="submit" class="ctaButton"> Update Visual </button>
				{/if}
			</div>
		</form>
	{/if}
</main>

<style>
	@reference "../layout.css";

	.input {
		@apply border border-brand-border px-1 text-xl font-label ;
	}

	.inputLabel {
		@apply flex flex-col font-heading text-3xl;
	}

	.ctaButton {
		@apply cursor-pointer rounded border-brand-highlight-1/20 bg-brand-highlight-1 px-4 py-1 text-center font-label text-2xl font-bold text-brand-dark-1;
	}
</style>
