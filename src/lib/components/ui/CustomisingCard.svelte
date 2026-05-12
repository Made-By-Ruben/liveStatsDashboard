<script>
	let { title, children } = $props();
</script>

<section
	class="flex h-full w-full flex-col overflow-hidden rounded border border-brand-blue bg-royal/50"
>
	<header
		class="w-full border-b border-brand-blue bg-royal p-4 font-heading text-2xl tracking-widest"
	>
		{title}
	</header>

	<div class="flex overflow-y-auto">
		{@render children()}
	</div>
</section>
