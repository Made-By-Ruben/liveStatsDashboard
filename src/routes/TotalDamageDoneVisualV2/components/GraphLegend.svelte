<script lang="ts">
	let { stats }: { stats: string[] } = $props();
</script>

<!-- TODO: add Stats icon folder and create a src:./statsIcons/{stat} instead of a box with colour-->

<div class="flex h-[10%] w-full items-center justify-center font-label">
	{#each stats as stat, i}
		<span
			class="flex w-1/6 items-center justify-center text-xs font-bold tracking-widest text-off-white uppercase"
		>
			{#if stat === 'True Damage'}
				<span class="mr-2 inline-block h-3 w-3 bg-off-white"></span>
			{:else}
				<img src="./StatModsIcons/StatMods{stat}Icon.png" />{/if}
			{stat}
		</span>

		{#if i < stats.length - 1}
			<span>/</span>
		{/if}
	{/each}
</div>
