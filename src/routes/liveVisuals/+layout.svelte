<script lang="ts">
	import type { LayoutProps } from '../$types';

	let { data, children }: LayoutProps = $props();
</script>

<main class="flex h-270 w-480 flex-col justify-end bg-[url(/src/lib/assets/Background.avif)]">
	<div class="flex h-62 w-full">
		<div class=" w-75.5 border border-border-blue"></div>
		<div class="62 w-visual-width flex-col border border-border-blue">
			{@render children()}
		</div>
		<div class=" w-76.5 border border-border-blue"></div>
	</div>
</main>

