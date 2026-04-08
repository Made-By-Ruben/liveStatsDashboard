import type { PageServerLoad } from './$types';

type stats = {
	name: string;
	value: number;
};

type player = {
	teamID: number;
	championName: string;
	playerName: string;
	stats: stats[];
};

export const load = (async () => {
	const apiResponse = await fetch(
		'http://localhost:3000/analyticalVisuals/TOTAL_DAMAGE_DEALT_TO_CHAMPIONS/306'
	);
	if (apiResponse.ok) {
		const data = await apiResponse.json();
		console.log(data);

		return { team1: data.data.team1 as player[], team2: data.data.team2 as player[] };
	} else {
		console.log('something went wrong');
	}
	return {};
}) satisfies PageServerLoad;
