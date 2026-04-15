<script lang="ts">
	let { stats } = $props();
</script>

<!-- TODO: add Stats icon folder and create a src:./statsIcons/{stat} instead of a box with colour-->

<div class="flex h-[10%] w-full items-center justify-center font-label">
	{#each stats as stat}
		<span class="flex items-center justify-center text-xs font-bold tracking-widest text-off-white uppercase w-1/6">
			{#if stat === 'True Damage'}
				<span class="mr-2 inline-block h-3 w-3 bg-off-white"></span>
			{:else}
				<img src="./StatModsIcons/StatMods{stat}Icon.png" />{/if}
			{stat}
		</span>
	{/each}
</div>
