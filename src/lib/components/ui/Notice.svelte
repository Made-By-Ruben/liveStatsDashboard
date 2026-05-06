<script lang="ts">

	let { message } = $props();
</script>

<div class="flex items-start gap-3 rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4">
	<span
		class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange font-label text-sm font-bold text-night"
	>
		!
	</span>
	<p class="font-body text-sm leading-relaxed">
		<span class="font-bold text-brand-orange">Important:</span>
		{message}
	</p>
</div>
