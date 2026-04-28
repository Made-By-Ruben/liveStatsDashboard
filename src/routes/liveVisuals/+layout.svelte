<script lang="ts">
	import type { LayoutProps } from '../TotalDamageDoneVisualV2/$types';

	let { data, children }: LayoutProps = $props();
</script>

<div
	class="mx-auto h-62 w-visual-width flex-col border border-brand-blue bg-linear-150 from-royal to-brand-blue"
>
	{@render children()}
</div>
