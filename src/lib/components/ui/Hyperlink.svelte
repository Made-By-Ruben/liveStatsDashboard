<script>
	let { endpoint, buttonText } = $props();
</script>

<a
	class="rounded-md bg-brand-highlight-1 px-4 py-3 font-label text-2xl font-bold tracking-wider text-brand-dark-1 uppercase shadow-lg shadow-brand-highlight-1/10 transition-colors hover:bg-brand-highlight-1/80"
	href={endpoint}
>
	{buttonText}
</a>
