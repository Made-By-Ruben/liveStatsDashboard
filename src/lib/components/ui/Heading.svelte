<script>
	let { title, body } = $props();
</script>

<div class="flex flex-col gap-2 text-center">
	<h1 class="font-heading text-6xl leading-none tracking-wide">{title}</h1>
	<p class="font-body text-sm text-brand-text/70">
		{body}
	</p>
</div>
