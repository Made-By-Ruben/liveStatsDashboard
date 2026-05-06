<script lang="ts">
	let { stats }: { stats: string[] } = $props();

	import physicalDmgIcon from '$lib/assets/StatModsIcons/StatModsPhysical DamageIcon.png'
	import magicalDmgIcon from '$lib/assets/StatModsIcons/StatModsMagic DamageIcon.png'
</script>

<div class="flex h-[10%] w-full items-center justify-center font-label border-t border-border-blue">
	{#each stats as stat, i}
		<span
			class="flex w-1/6 items-center justify-center text-xs font-bold tracking-widest text-lime uppercase"
		>
			{#if stat === 'True Damage'}
				<span class="mr-2 inline-block h-3 w-3 bg-off-white"></span>
			{:else}
				<img class="size-5" src={stat === 'Magic Damage' ? magicalDmgIcon : physicalDmgIcon} />{/if}
			{stat}
		</span>

		{#if i < stats.length - 1}
			<span class="text-border-blue">/</span>
		{/if}
	{/each}
</div>
