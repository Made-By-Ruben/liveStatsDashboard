import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type ChampionStats = Record<string, number>;

export type TeamStats = Record<string, ChampionStats>;

export type VisualStats = Record<number, TeamStats>;

export const load = (async () => {
	const apiResponse = await fetch(
		'http://localhost:3000/analyticalVisuals/TOTAL_DAMAGE_DEALT_TO_CHAMPIONS/250'
	);

	if (apiResponse.ok) {
		const data = await apiResponse.json();
		console.log(data);
		return {
			team1: data.data[100],
			team2: data.data[200],
			maxDamage: data.data.maxDamage
		};
	} else {
		error(apiResponse.status, 'Enhance your calm');
	}
}) satisfies PageServerLoad;
