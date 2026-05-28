<script lang="ts">

	let { message } = $props();
</script>

<div class="flex items-start gap-3 rounded-lg border border-brand-secondary-1/40 bg-brand-secondary-1/10 p-4">
	<span
		class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary-1 font-label text-sm font-bold text-brand-dark-1"
	>
		!
	</span>
	<p class="font-body leading-relaxed">
		<span class="font-bold text-brand-secondary-1">Important:</span>
		{message}
	</p>
</div>
