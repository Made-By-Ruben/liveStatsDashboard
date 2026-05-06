<script>
	import logo from '$lib/assets/rolLogoVertical.avif';
</script>

<div class={['relative flex h-full w-full', 'background']}>
	<div class={['h-full w-1 bg-lime absolute opacity-0 drop-shadow-2xl drop-shadow-lime ', 'highlighter']}></div>
	<div class="relative z-10 w-1/2">
		<div class={['h-full w-0 transform-gpu bg-lime', 'curtainsLeft']}></div>
	</div>
	<div class={['absolute flex h-full w-full items-center justify-center opacity-0', 'logo']}>
		<img class="h-full p-10" src={logo} alt="ROL" />
	</div>
	<div class="flex w-1/2 flex-row-reverse">
		<div class={['h-full w-0 transform-gpu bg-lime', 'curtainsRight']}></div>
	</div>
</div>

<style>
	.curtainsLeft {
		animation-duration: 1000ms;
		animation-name: flyInOut;
		animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
	}

	.curtainsRight {
		animation-duration: 1000ms;
		animation-name: flyInOut;
		animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
	}
	.logo {
		animation-delay: 800ms;
		animation-duration: 1200ms;
		animation-name: fadeInOut;
		animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	.highlighter {
		animation: swipeLTR;
		animation-delay: 800ms;
		animation-duration: 1000ms;
        animation-timing-function: ease-in-out;
	}

	@keyframes swipeLTR {
		0% {
            left: 0;
		}
        50%{
            opacity: 50%;
        }
        100% {
            left: 100%;
        }
	}

	@keyframes flyInOut {
		0% {
			width: 0%;
		}
		50% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}

	@keyframes fadeInOut {
		0% {
			scale: 0;
		}

		50% {
			scale: 100%;
			opacity: 100%;
		}

		100% {
            scale: 0;
			opacity: 0%;
		}
	}
</style>
