<script>
	let confirmed = $state(false);
</script>

<div class="flex h-screen w-full items-center justify-center bg-royal">
	<div class="flex flex-col rounded border border-egyptian p-10">
		<h1 class="text-center font-heading text-7xl text-off-white">Connect to live match</h1>
		<p class="text-2xl text-off-white">
			IMPORTANT: Make sure the match you want to connect to is added on the Datamonster Dashboard
		</p>

		<div class="flex justify-center gap-2">
			<input id="check" type="checkbox" />
			<label for="check" class="font-label text-off-white">Confirmed match in DataMonster</label>
		</div>

		<div class="flex justify-center gap-2">
			<button
				class="rounded bg-lime px-4 py-2 font-label text-2xl font-bold transition-colors hover:bg-lime-600"
			>
				Connect to live match
			</button>
			<button
				class="rounded border border-egyptian px-4 py-2 font-label text-2xl font-bold text-off-white transition-colors"
			>
				Manually add matchID
			</button>
		</div>
	</div>
</div>
