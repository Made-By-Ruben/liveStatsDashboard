<script>
	let { title, children } = $props();
</script>

<section
	class="flex h-full w-full flex-col overflow-hidden rounded border border-brand-primary-1 bg-brand-primary-3/50"
>
	<header
		class="w-full border-b border-brand-primary-1 bg-brand-primary-3 p-4 font-heading text-2xl tracking-widest"
	>
		{title}
	</header>

	<div class="flex overflow-y-auto">
		{@render children()}
	</div>
</section>
