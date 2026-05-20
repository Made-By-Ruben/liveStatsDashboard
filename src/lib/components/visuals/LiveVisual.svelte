<script lang="ts">
	import { SseConnection } from '$lib/sseStream.svelte';
	import { onDestroy, onMount } from 'svelte';
	import TotalDamageDone from './TotalDamageDone.svelte';
	import { fade } from 'svelte/transition';
	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	// TODO: pass through a generic for the payload type format based on the visual
	type Payload = { 100: TeamStats; 200: TeamStats; maxDamage: number };

	let { visualName, url }: { visualName: string; url: string } = $props();

	let stream = $state<SseConnection<Payload>>();

	onMount(() => {
		stream = new SseConnection<Payload>(url);
	});

	onDestroy(() => {
		stream?.close();
	});
</script>

<div class="h-full w-full" in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
	{#if stream === undefined || stream.status === 'connecting'}
		<div class="flex h-[90%] w-full justify-between p-2">
			<h1 class="self-center text-2xl text-off-white">Connecting...</h1>
		</div>
	{:else if stream.data}
		<TotalDamageDone data={stream.data} />
	{/if}
</div>
