<script lang="ts">
	import Heading from '$lib/components/ui/Heading.svelte';
	import Hyperlink from '$lib/components/ui/Hyperlink.svelte';
	import Notice from '$lib/components/ui/Notice.svelte';
	import { getVisualStyle } from '$lib/utils/getVisualStyle.js';
	import { onMount } from 'svelte';

	let { form } = $props();

	let editing = $state(false);
	let confirmed = $state(false);
	let matchId = $state();
	let visualStyle = $state("ROL")

	$effect(() => {
		localStorage.setItem('visualStyle', form?.visualStyle ?? "ROL");
	});

	onMount(()=>{
		visualStyle = getVisualStyle();
	})
</script>

<form
	method="POST"
	class={[
		'flex min-h-screen w-full items-center justify-center bg-cover px-4 py-10 text-brand-text',
		visualStyle === 'NLC' && 'bg-[url(/src/lib/assets/nlc/nlcBg.avif)]',
		visualStyle !== 'NLC' && 'bg-[url(/src/lib/assets/rol/rolBg.avif)]'
	]}
>
	<div
		class="flex w-full max-w-xl flex-col gap-8 rounded-2xl border border-brand-border bg-brand-primary-3 p-10 shadow-2xl backdrop-blur-sm"
	>
		<Heading
			title={'Connect to live match'}
			body={'Enter the match ID to start streaming live stats.'}
		/>

		{#if form && !editing}
			<div
				class="flex flex-col rounded-md border border-brand-border bg-brand-dark-1/40 px-4 py-3 font-body text-lg"
			>
				<span class="font-label text-2xl font-bold">Connected to match:</span>
				<span class="text-brand-highlight-1">{form.matchInfo.data}</span>
			</div>

			<div class="flex justify-evenly">
				<button
					class="cursor-pointer rounded-md bg-brand-secondary-1 px-4 py-3 font-label text-2xl font-bold tracking-wider text-brand-dark-1 uppercase shadow-lg shadow-brand-highlight-1/10 transition-colors hover:bg-brand-secondary-1/80"
					onclick={() => (editing = true)}
					type="button"
				>
					change match
				</button>

				<Hyperlink endpoint={'/activeVisuals'} buttonText={'To visuals'} />
			</div>
		{:else}
			<Notice
				message={'Make sure the match you want to connect to is added on the Datamonster Dashboard.'}
			/>
			<div class="flex flex-col gap-2">
				<label class="font-label text-lg tracking-wider uppercase" for="matchId"> match ID </label>
				<input
					bind:value={matchId}
					type="number"
					id="matchId"
					name="matchId"
					placeholder="e.g. 150"
					class="rounded-md border border-brand-border bg-brand-dark-1/40 px-4 py-3 font-body text-lg transition-colors placeholder:text-brand-text/30 focus:border-brand-highlight-1 focus:ring-2 focus:ring-brand-highlight-1/50 focus:outline-none"
				/>
			</div>
			<!-- Confirm match section -->
			<label for="check" class="flex cursor-pointer items-center gap-3 font-label select-none">
				<input
					bind:checked={confirmed}
					id="check"
					type="checkbox"
					class="h-5 w-5 cursor-pointer accent-brand-highlight-1"
				/>
				<span>Confirmed match in DataMonster</span>
			</label>

			<!-- submit button -->
			<button
				disabled={!confirmed}
				class={[
					'w-full rounded-md bg-brand-highlight-1 px-4 py-3 font-label  text-2xl font-bold tracking-wider text-brand-dark-1 uppercase shadow-lg shadow-brand-highlight-1/10 transition-colors hover:bg-brand-highlight-1/80',
					!confirmed && 'cursor-not-allowed'
				]}
			>
				Connect to live match
			</button>
		{/if}
	</div>
</form>
