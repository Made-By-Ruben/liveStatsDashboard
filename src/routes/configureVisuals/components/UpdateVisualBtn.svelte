<script lang="ts">
	import { fade } from 'svelte/transition';

	let { loading }: {loading: boolean} = $props();
</script>

{#if loading}
	<div in:fade={{ duration: 200 }} class="ctaButton">Loading...</div>
{:else}
	<button in:fade={{ duration: 200 }} type="submit" class="ctaButton"> Update Visual </button>
{/if}
