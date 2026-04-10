<script lang="ts">
	import { onMount } from 'svelte';
	import { calcPercentage } from '$lib/utils/calcPercentage';

	type ChampionStats = Record<string, number>;
	type TeamStats = Record<string, ChampionStats>;

	let { team, teamIndex, maxDamage }: { team: TeamStats; teamIndex: number; maxDamage: number } =
		$props();

	const totalDmgChamps = 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const physicalDmgChamps = 'PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS';
	const magicDmgChamps = 'MAGIC_DAMAGE_DEALT_TO_CHAMPIONS';
	const trueDmgChamps = 'TRUE_DAMAGE_DEALT_TO_CHAMPIONS';

	let displayValues = $state<Record<string, number>>({});

	const isRight = $derived(teamIndex === 1);

	onMount(() => {
		// Counter animations
		const DURATION = 900;
		const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

		Object.entries(team).forEach(([player, stats], i) => {
			const target = stats[totalDmgChamps] ?? 0;
			const delay = i * 100 + 300;
			const start = performance.now() + delay;

			function tick(now: number) {
				if (now < start) {
					requestAnimationFrame(tick);
					return;
				}
				const t = Math.min((now - start) / DURATION, 1);
				displayValues[player] = Math.round(easeOut(t) * target);
				if (t < 1) requestAnimationFrame(tick);
			}
			requestAnimationFrame(tick);
		});
	});
</script>

<div class="flex w-1/2 flex-col gap-1">
	<!-- Team Label -->
	<div
		class="team-label mb-2 px-1 pb-1 text-sm tracking-[0.2em] text-lime {isRight
			? 'text-right'
			: 'text-left'}"
	>
		{isRight ? 'TEAM 2 ◆' : '◆ TEAM 1'}
	</div>

	{#each Object.entries(team) as [player, stats], i (player)}
		{@const barWidth = calcPercentage(stats[totalDmgChamps], maxDamage)}
		{@const physicalPct = calcPercentage(stats[physicalDmgChamps], stats[totalDmgChamps])}
		{@const magicPct = calcPercentage(stats[magicDmgChamps], stats[totalDmgChamps])}
		{@const truePct = calcPercentage(stats[trueDmgChamps], stats[totalDmgChamps])}
		<!-- Inner panel: clipped angular shape -->
		<div
			class="flex w-full gap-2 bg-blue-950/50 px-2 py-2 {isRight
				? 'flex-row-reverse'
				: ''} justify-between"
		>
			<div class="flex w-full items-center {isRight ? 'flex-row-reverse' : ''} ">
				<!-- Champion Avatar -->
				<div class="relative shrink-0">
					<img class="avatar-img size-10 object-cover" src="./champion/{player}.png" alt={player} />
					<div class="avatar-ring absolute inset-0"></div>
				</div>
				<!-- Player Name -->
				<div
					class="w-20 shrink-0 truncate font-label text-xs font-bold tracking-widest text-off-white uppercase {isRight
						? 'text-right'
						: 'text-left'}"
					title={player}
				>
					{player}
				</div>
				<!-- Bar Track -->

				<div
					class="flex h-full {isRight
						? 'bar-fill-wrapper-rtl flex-row-reverse'
						: 'bar-fill-wrapper-ltr'}"
					style="width: {barWidth}%;"
				>
					<div class="h-full bg-lime" style="width: {physicalPct}%;"></div>
					<div class="h-full bg-brand-blue" style="width: {magicPct}%;"></div>
					<div class="h-full bg-off-white" style="width: {truePct}%;"></div>
				</div>
			</div>

			<!-- Damage Badge -->
			<div
				class="w-20 shrink-0 flex-col items-center justify-center justify-self-end bg-egyptian px-3 py-1 {isRight
					? 'damage-badge-right'
					: 'damage-badge-left'}"
			>
				<div class="font-heading text-lg leading-none text-lime">
					{(displayValues[player] ?? 0).toLocaleString()}
				</div>
				<div class="font-label text-[9px] tracking-widest text-brand-blue uppercase">DMG</div>
			</div>
		</div>
	{/each}
</div>

<style>
	/* ── Team label ───────────────────────────────────────────── */
	.team-label {
		font-family: var(--font-heading);
		border-bottom: 1px solid #d3fe31;
	}

	/* ── Bar wipe animations ──────────────────────────────────── */
	@keyframes wipe-in-ltr {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0% 0 0);
		}
	}

	@keyframes wipe-in-rtl {
		from {
			clip-path: inset(0 0 0 100%);
		}
		to {
			clip-path: inset(0 0 0 0%);
		}
	}

	.bar-fill-wrapper-ltr {
		animation: wipe-in-ltr 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(var(--row-index, 0) * 100ms + 200ms);
	}

	.bar-fill-wrapper-rtl {
		animation: wipe-in-rtl 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(var(--row-index, 0) * 100ms + 200ms);
	}

	/* ── Champion avatar clipped corners ──────────────────────── */
	.avatar-img {
		clip-path: polygon(
			6px 0%,
			100% 0%,
			100% calc(100% - 6px),
			calc(100% - 6px) 100%,
			0% 100%,
			0% 6px
		);
	}

	.avatar-ring {
		clip-path: polygon(
			6px 0%,
			100% 0%,
			100% calc(100% - 6px),
			calc(100% - 6px) 100%,
			0% 100%,
			0% 6px
		);
		border: 1px solid #0066ff;
		opacity: 0.7;
	}

	/* ── Damage badge parallelogram ───────────────────────────── */

	.damage-badge-left {
		clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
	}

	.damage-badge-right {
		clip-path: polygon(0% 0%, calc(100% - 6px) 0%, 100% 100%, 6px 100%);
	}

	/* ── Typography ───────────────────────────────────────────── */
</style>
