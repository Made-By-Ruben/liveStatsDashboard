<script>
	let { value = $bindable(), items } = $props();
</script>

<select
	class="h-full w-full rounded border border-brand-blue bg-egyptian/50 px-2 py-1"
	name="team1"
	id="team1-select"
	bind:value
>
	{#each items as { value, label }}
		<option {value} class="">
			{label}
		</option>
	{/each}
</select>
