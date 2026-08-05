<script lang="ts">
	import { fade } from 'svelte/transition';

	type propTypes = {
		allowedStats: {
			value: string;
			label: string;
		}[];

		requestedStats: string[];

		onToggleStat(stat: string): void;
	};

	let { allowedStats, requestedStats, onToggleStat }: propTypes = $props();
</script>

<div
	class="max-w-1/3 overflow-scroll border border-brand-border p-5 shadow-2xl"
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	<ul class="font-label">
		{#each allowedStats as allowedStat}
			{@const selected = requestedStats.includes(allowedStat.value)}
			{@const isBlocked = requestedStats.length >= 4 && !selected}
			<li>
				<label>
					<input
						type="checkbox"
						disabled={isBlocked}
						checked={selected}
						onchange={() => onToggleStat(allowedStat.value)}
					/>
					{allowedStat.label}
				</label>
			</li>
		{/each}
	</ul>
</div>
