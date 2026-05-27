<script lang="ts">
	import { SseConnection } from '$lib/sseStream.svelte';
	import { onDestroy, onMount } from 'svelte';
	import TotalDamageDone from './TotalDamageDone.svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import SpotlightVisual from '../SpotlightVisual.svelte';

	let { visualType, visualName } = $props();

	let stream = $state<SseConnection>();

	onMount(() => {
		stream = new SseConnection(`${PUBLIC_SERVER_URL}${visualType}/stream/${visualName}`);
	});

	onDestroy(() => {
		stream?.close();
	});
</script>

<div class="h-full w-full" in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
	{#if stream === undefined || stream.status === 'connecting'}
		<div class="flex h-[90%] w-full justify-between p-2"></div>
	{:else if stream.data}
		{#if visualType === "customVisuals"}
		<SpotlightVisual data={stream.data} />
		{:else}
		<TotalDamageDone data={stream.data} />
		{/if}
	{/if}
</div>
