<script lang="ts">
	let { onComplete, onDroppedDown }: { onComplete: () => void; onDroppedDown: () => void } =
		$props();
</script>

<div
	class="relative flex h-full w-full"
	onanimationend={(ev) => {
		ev.animationName.includes('dropDown') ? onDroppedDown() : null;
		ev.animationName.includes('raiseUp') ? onComplete() : null;
	}}
>
	<div class="curtainsDown h-1 w-full transform-gpu bg-brand-highlight-1"></div>
</div>

<style>
	.curtainsDown {
		animation:
			dropDown 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards,
			raiseUp 500ms 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
	}

	@keyframes dropDown {
		0% {
			height: 0%;
		}
		100% {
			height: 100%;
		}
	}

	@keyframes raiseUp {
		0% {
			height: 100%;
		}
		100% {
			height: 0%;
		}
	}
</style>
