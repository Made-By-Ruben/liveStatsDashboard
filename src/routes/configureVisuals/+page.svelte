<script lang="ts">
	import type { Visual } from '$lib/server/schemas';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import EditVisual from '$lib/components/visuals/EditVisual.svelte';
	import { onMount } from 'svelte';
	import { getVisualStyle } from '$lib/utils/getVisualStyle';
	import Header from './components/Header.svelte';
	import VisualOverview from './components/VisualOverview.svelte';
	import UpdateVisualBtn from './components/UpdateVisualBtn.svelte';
	import EditStatsMenu from './components/EditStatsMenu.svelte';
	import SelectStats from './components/SelectStats.svelte';
	import TeamRoleSelection from './components/TeamRoleSelection.svelte';

	let { data }: PageProps = $props();
	let editVisual = $state(false);
	let editStats = $state(false);
	let selectedVisual = $state<Visual | null>(null);
	let loading = $state(false);
	let visualStyle = $state<string>();

	function visualClicked(visual: Visual) {
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
		console.log('To Do');
	}

	onMount(() => {
		visualStyle = getVisualStyle();
	});
</script>

<main class="min-h-screen w-full bg-brand-primary-3 px-10 py-5">
	<Header
		{editVisual}
		onExportConfig={createCompanionConfig}
		onCloseVisual={() => (editVisual = false)}
	/>

	{#if !editVisual}
		<VisualOverview visuals={data.visuals} onVisualClick={visualClicked} />
	{:else if editVisual && selectedVisual !== null}
		<form
			method="POST"
			class="flex flex-col items-center gap-5 border border-brand-border p-10 text-brand-off-white"
			in:fade={{ duration: 200 }}
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					editVisual = false;
					await update();
				};
			}}
		>
			<input hidden name="selectedVisual" value={JSON.stringify(selectedVisual)} type="text" />
			<div
				class={[
					'flex h-62.25 w-334.25 flex-col border border-brand-border',
					visualStyle === 'ROL' && 'bg-[url(/src/lib/assets/rol/rolCroppedBg.avif)]',
					visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcCroppedBg.avif)]'
				]}
			>
				<EditVisual {visualStyle} data={selectedVisual.visualConfig} />
			</div>

			<div class="flex w-full flex-col gap-5">
				<label class="inputLabel"
					>Visual Name: <input
						class="input"
						id="visualLabel"
						type="text"
						placeholder={selectedVisual.visualLabel}
						bind:value={selectedVisual.visualLabel}
					/></label
				>

				<TeamRoleSelection roles={data.roles} teams={data.teams} bind:selectedTeam={selectedVisual.visualConfig.selectedTeam} bind:selectedRole={selectedVisual.visualConfig.selectedRole} />

				<SelectStats
					requestedStats={selectedVisual.visualConfig.requestedStats}
					onFinishEdit={() => (editStats = !editStats)}
				/>

				{#if editStats}
					<EditStatsMenu
						allowedStats={data.allowedStats}
						requestedStats={selectedVisual.visualConfig.requestedStats}
						onToggleStat={toggleStat}
					/>
				{/if}

				<UpdateVisualBtn {loading} />
			</div>
		</form>
	{/if}
</main>
