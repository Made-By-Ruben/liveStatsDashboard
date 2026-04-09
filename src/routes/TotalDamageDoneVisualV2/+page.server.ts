import type { PageServerLoad } from './$types';

export type ChampionStats = Record<string, number>;

export type TeamStats = Record<string, ChampionStats>;

export type VisualStats = Record<number, TeamStats>;

export const load = (async () => {
	try {
		const apiResponse = await fetch(
			'http://localhost:3000/analyticalVisuals/TOTAL_DAMAGE_DEALT_TO_CHAMPIONS/306'
		);
		if (apiResponse.ok) {
			const data = await apiResponse.json();
			console.log(data)
			return {
				team1: data.data[100],
				team2: data.data[200],
				maxDamage: data.data.maxDamage
			};
		} else {
			console.log('something went wrong');
		}
	} catch (error) {}
}) satisfies PageServerLoad;
