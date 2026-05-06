<script lang="ts">
	import Notice from '$lib/components/ui/Notice.svelte';

	let confirmed = $state(false);
	let matchId = $state();
</script>

<form
	method="POST"
	class="flex min-h-screen w-full items-center justify-center bg-royal px-4 py-10 text-off-white"
>
	<div
		class="flex w-full max-w-xl flex-col gap-8 rounded-2xl border border-egyptian bg-royal/70 p-10 shadow-2xl backdrop-blur-sm"
	>
		<!-- Header section -->
		<div class="flex flex-col gap-2 text-center">
			<h1 class="font-heading text-6xl leading-none tracking-wide">Connect to live match</h1>
			<p class="font-body text-sm text-off-white/70">
				Enter the match ID to start streaming live stats.
			</p>
		</div>

		<!-- Notice section -->
		<Notice
			message={'Make sure the match you want to connect to is added on the Datamonster Dashboard.'}
		/>

		<!-- Input matchId section -->
		<div class="flex flex-col gap-2">
			<label class="font-label text-lg tracking-wider uppercase" for="matchId"> match ID </label>
			<input
				bind:value={matchId}
				type="number"
				id="matchId"
				name="matchId"
				placeholder="e.g. 150"
				class="rounded-md border border-border-blue bg-night/40 px-4 py-3 font-body text-lg placeholder:text-off-white/30 focus:border-lime focus:ring-2 focus:ring-lime/50 focus:outline-none"
			/>
		</div>

		<!-- Confirm match section -->
		<label for="check" class="flex cursor-pointer items-center gap-3 font-label select-none">
			<input
				bind:checked={confirmed}
				id="check"
				type="checkbox"
				class="h-5 w-5 cursor-pointer accent-lime"
			/>
			<span>Confirmed match in DataMonster</span>
		</label>


		<!-- submit button -->
		<button
			disabled={!confirmed}
			class={[
				'w-full rounded-md bg-lime px-4 py-3 font-label  text-2xl font-bold tracking-wider text-night uppercase shadow-lg shadow-lime/10 transition-colors hover:bg-lime/80',
				!confirmed && 'cursor-not-allowed'
			]}
		>
			Connect to live match
		</button>
	</div>
</form>
