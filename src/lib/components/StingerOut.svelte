<script lang="ts">
	let { onComplete, onCurtainsMeet }: { onComplete: () => void; onCurtainsMeet: () => void } =
		$props();
</script>

<div
	class={['relative flex h-full w-full']}
	onanimationend={(ev) => {
		ev.animationName.includes('flyIn') ? onCurtainsMeet() : null;
		ev.animationName.includes('fadeInOut') ? onComplete() : null;
	}}
>
	<div class="relative z-10 w-1/2">
		<div class={['h-full w-0 transform-gpu bg-lime', 'curtainsLeft']}></div>
	</div>
	<div class="flex w-1/2 flex-row-reverse">
		<div class={['h-full w-0 transform-gpu bg-lime', 'curtainsRight']}></div>
	</div>
</div>

<style>
	.curtainsLeft,
	.curtainsRight {
		animation:
			flyIn 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards,
			flyOut 500ms 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
	}

	@keyframes flyIn {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes flyOut {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
</style>
