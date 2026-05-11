<script>
	let { endpoint, buttonText } = $props();
</script>

<a
	class="rounded-md bg-lime px-4 py-3 font-label text-2xl font-bold tracking-wider text-night uppercase shadow-lg shadow-lime/10 transition-colors hover:bg-lime/80"
	href={endpoint}
>
	{buttonText}
</a>
