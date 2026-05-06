<script>
	let confirmed = $state(false);
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-royal px-4 py-10">
	<div
		class="flex w-full max-w-xl flex-col gap-8 rounded-2xl border border-egyptian bg-royal/70 p-10 shadow-2xl backdrop-blur-sm"
	>
		<div class="flex flex-col gap-2 text-center">
			<h1 class="font-heading text-6xl leading-none tracking-wide text-off-white">
				Connect to live match
			</h1>
			<p class="font-body text-sm text-off-white/70">
				Enter the MatchID to start streaming live stats.
			</p>
		</div>

		<div
			class="flex items-start gap-3 rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4"
		>
			<span
				class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange font-label text-sm font-bold text-night"
			>
				!
			</span>
			<p class="font-body text-sm leading-relaxed text-off-white">
				<span class="font-bold text-brand-orange">Important:</span>
				Make sure the match you want to connect to is added on the Datamonster Dashboard.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<label class="font-label text-lg tracking-wider text-off-white uppercase" for="matchId">
				MatchID
			</label>
			<input
				min="0"
				type="number"
				id="matchId"
				placeholder="e.g. 150"
				class="rounded-md border border-border-blue bg-night/40 px-4 py-3 font-body text-lg text-off-white placeholder:text-off-white/30 focus:border-lime focus:ring-2 focus:ring-lime/50 focus:outline-none"
			/>
		</div>

		<label
			for="check"
			class="flex cursor-pointer items-center gap-3 font-label text-off-white select-none"
		>
			<input id="check" type="checkbox" class="h-5 w-5 cursor-pointer accent-lime" />
			<span>Confirmed match in DataMonster</span>
		</label>

		<button
			class="w-full rounded-md bg-lime px-4 py-3 font-label text-2xl font-bold tracking-wider text-night uppercase shadow-lg shadow-lime/10 transition-colors hover:bg-lime/80"
		>
			Connect to live match
		</button>
	</div>
</div>
