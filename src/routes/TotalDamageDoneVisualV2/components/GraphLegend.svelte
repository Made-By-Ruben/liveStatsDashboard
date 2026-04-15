<script lang="ts">
	let { stats } = $props();
</script>


<!-- TODO: add Stats icon folder and create a src:./statsIcons/{stat} instead of a box with colour-->

<div class="flex h-[10%] w-full items-center justify-center gap-8 font-label">
	{#each stats as stat, i}
		<span
			class="flex items-center gap-2 text-xs font-bold tracking-widest text-off-white uppercase"
		>
			<span class="inline-block h-3 w-3 bg-lime"></span>
			{stat}
		</span>
	{/each}
</div>
