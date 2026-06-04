<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { getVisualAssets } from '$lib/visualAssetsConfig';
	import { onMount } from 'svelte';
	import { getVisualStyle } from '$lib/utils/getVisualStyle';
	import Title from './components/Title.svelte';
	import Button from './components/Button.svelte';
	import Modal from './components/Modal.svelte';
	let { data }: PageProps = $props();

	let showModal = $state(false);

	let step = $state(1);
	let visualStyle = $state<string>();
	let icons = $derived(getVisualAssets(visualStyle).roleIcons);

	type VisualConfigType = {
		visualId: number;
		visualName: string;
		responseFormat: 'spotlight' | 'head2Head';
		selectedRole: string;
		requestedStats: string[];
		requestedPlayers: string[];
	};

	type VisualConfigState = {
		team1: {
			name: string | undefined;
			visualConfigs: VisualConfigType[] | null;
		};
		team2: {
			name: string | undefined;
			visualConfigs: VisualConfigType[] | null;
		};
	};

	let visualState = $state<VisualConfigState>({
		team1: {
			name: undefined,
			visualConfigs: null
		},
		team2: {
			name: undefined,
			visualConfigs: null
		}
	});

	onMount(() => {
		visualStyle = getVisualStyle();
	});

	$inspect(visualState);
</script>

<div
	class="flex min-h-screen w-full flex-col items-center justify-center bg-brand-primary-3 text-brand-text"
>
	<main
		class="flex w-full max-w-2xl flex-col items-center rounded-xl border border-brand-border bg-brand-dark-1/30 p-12 shadow-xl shadow-black/30"
	>
		{#if step === 0}
			<div class="flex flex-col items-center gap-12" in:fade={{ duration: 200 }}>
				<Title title={'Select the teams that are playing'} />

				<div class="flex items-end gap-6">
					<label class="flex flex-col gap-2">
						<span class="font-label text-xs tracking-widest text-brand-text/60 uppercase">
							Team 1
						</span>
						<select
							bind:value={visualState.team1.name}
							class="cursor-pointer rounded-md border border-brand-border bg-brand-dark-1 px-5 py-3 font-body text-lg text-brand-text transition-colors hover:border-brand-primary-1 focus:border-brand-primary-1 focus:ring-2 focus:ring-brand-primary-1/40 focus:outline-none"
						>
							{#each data.teams as team (team.value)}
								<option value={team.value}>{team.label}</option>
							{/each}
						</select>
					</label>

					<span class="pb-3 font-heading text-3xl tracking-wider text-brand-highlight-1">vs</span>

					<label class="flex flex-col gap-2">
						<span class="font-label text-xs tracking-widest text-brand-text/60 uppercase">
							Team 2
						</span>
						<select
							bind:value={visualState.team2.name}
							class="cursor-pointer rounded-md border border-brand-border bg-brand-dark-1 px-5 py-3 font-body text-lg text-brand-text transition-colors hover:border-brand-primary-1 focus:border-brand-primary-1 focus:ring-2 focus:ring-brand-primary-1/40 focus:outline-none"
						>
							{#each data.teams as team (team.value)}
								<option value={team.value}>{team.label}</option>
							{/each}
						</select>
					</label>
				</div>

				<Button callback={() => (step = 1)} isCTA={true} text={'Next Step'} />
			</div>
		{:else if step === 1}
			<div class="flex flex-col items-center gap-12" in:fade={{ duration: 200 }}>
				<Title title={`Prepare Visuals for team: ${visualState.team1.name}`} />

				<div class="grid w-full">
					{#if visualState.team1.visualConfigs === null}
						<div class="flex items-center justify-center border border-brand-border">
							No Visuals created
						</div>
					{:else}
						{#each visualState.team1.visualConfigs as visualConfig, i}
							<div class="flex items-center justify-evenly border border-brand-border">
								<div>
									<img src={icons[visualConfig.selectedRole]} />
									<p>{visualConfig.visualName}</p>
								</div>
							</div>
						{/each}
					{/if}

					<div class="w-50">
						<Button callback={() => (showModal = true)} isCTA={false} text={'+'} />
					</div>
				</div>

				<div class="flex justify-between gap-6">
					<Button callback={() => (step = 0)} isCTA={false} text={'Go back'} />
					<Button callback={() => (step = 2)} isCTA={true} text={'Next Step'} />
				</div>
			</div>
		{:else if step === 2}
			<div class="flex flex-col items-center gap-12" in:fade={{ duration: 200 }}>
				<Title title={`Create a new visual`} />

				<div class="flex justify-between gap-6">
					<Button callback={() => (step = 0)} isCTA={false} text={'Go back'} />
					<Button callback={() => (step = 2)} isCTA={true} text={'Next Step'} />
				</div>
			</div>
		{/if}
	</main>
</div>

<Modal bind:showModal>
	{#snippet header()}
		<h2>Create new visual</h2>
	{/snippet}

	<form class="flex flex-col gap-5">
		<label class="flex flex-col gap-2">
			<span class="font-label text-xs tracking-widest text-brand-text/60 uppercase">Visual name</span>
			<input
				type="text"
				placeholder="e.g. Player spotlight"
				class="rounded-md border border-brand-border bg-brand-primary-3 px-4 py-3 font-body text-base text-brand-text transition-colors placeholder:text-brand-text/40 hover:border-brand-primary-1 focus:border-brand-primary-1 focus:ring-2 focus:ring-brand-primary-1/40 focus:outline-none"
			/>
		</label>

		<label class="flex flex-col gap-2">
			<span class="font-label text-xs tracking-widest text-brand-text/60 uppercase">Which player?</span>
			<select
				class="cursor-pointer rounded-md border border-brand-border bg-brand-primary-3 px-4 py-3 font-body text-base text-brand-text transition-colors hover:border-brand-primary-1 focus:border-brand-primary-1 focus:ring-2 focus:ring-brand-primary-1/40 focus:outline-none"
			>
				{#each data.roles as role (role.value)}
					<option value={role.value}>{role.label}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-2">
			<span class="font-label text-xs tracking-widest text-brand-text/60 uppercase">Which stats?</span>
			<select
				class="cursor-pointer rounded-md border border-brand-border bg-brand-primary-3 px-4 py-3 font-body text-base text-brand-text transition-colors hover:border-brand-primary-1 focus:border-brand-primary-1 focus:ring-2 focus:ring-brand-primary-1/40 focus:outline-none"
			>
				{#each data.allowedStats as stat (stat.value)}
					<option value={stat.value}>{stat.label}</option>
				{/each}
			</select>
		</label>
	</form>
</Modal>
