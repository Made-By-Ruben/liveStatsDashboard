<script lang="ts">
	import { fade } from 'svelte/transition';
	type propTypes = {
		requestedStats: string[];
		onFinishEdit(): void;
	}
	let { onFinishEdit, requestedStats }: propTypes = $props();
</script>

<div class="flex gap-2">
	<button
		class="font- w-1/3 cursor-pointer rounded border-brand-highlight-1/20 bg-brand-primary-1 px-4 py-1 text-left font-heading text-brand-off-white"
		type="button"
		onclick={onFinishEdit}
		in:fade={{ duration: 200 }}
	>
		Select Stats
	</button>

	<p class="italic">
		Selected stats: {requestedStats.length}/4
	</p>
</div>
