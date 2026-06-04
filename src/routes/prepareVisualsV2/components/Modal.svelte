<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="m-auto w-full max-w-lg rounded-xl border border-brand-border bg-brand-dark-1 p-0 text-brand-text shadow-2xl shadow-black/50 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
>
	<div class="flex flex-col gap-5 p-8">
		<div class="font-heading text-3xl tracking-widest text-brand-off-white">
			{@render header?.()}
		</div>

		<hr class="border-brand-border/50" />

		<div class="font-body leading-relaxed text-brand-text/90">
			{@render children?.()}
		</div>

		<hr class="border-brand-border/50" />

		<!-- svelte-ignore a11y_autofocus -->
		<button
			autofocus
			onclick={() => dialog.close()}
			class="cursor-pointer self-end rounded border border-brand-highlight-1 px-4 py-1 text-center font-label text-2xl font-bold text-brand-off-white uppercase transition-colors hover:bg-brand-highlight-1 hover:text-brand-dark-1"
		>
			Close
		</button>
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
