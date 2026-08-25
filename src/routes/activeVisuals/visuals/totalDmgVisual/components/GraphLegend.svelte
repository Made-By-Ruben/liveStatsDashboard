<script lang="ts">
	let { stats }: { stats: string[] } = $props();

	import physicalDmgIcon from '$lib/assets/shared/statModsIcons/StatModsPhysical DamageIcon.png';
	import magicalDmgIcon from '$lib/assets/shared/statModsIcons/StatModsMagic DamageIcon.png';
</script>

<div
	class="flex h-[10%] w-full items-center justify-center border-t border-brand-border font-label"
>
	{#each stats as stat, i}
		<span
			class="flex w-1/6 items-center justify-center text-xs font-bold tracking-widest text-brand-highlight-1 uppercase"
		>
			{#if stat === 'True Damage'}
				<span class="mr-2 inline-block h-3 w-3 bg-brand-off-white"></span>
			{:else}
				<img class="size-5" src={stat === 'Magic Damage' ? magicalDmgIcon : physicalDmgIcon} />{/if}
			{stat}
		</span>

		{#if i < stats.length - 1}
			<span class="text-brand-border">/</span>
		{/if}
	{/each}
</div>
