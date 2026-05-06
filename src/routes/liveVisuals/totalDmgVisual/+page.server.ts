import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const config = JSON.stringify({
	isCustom: false,
	visualName: 'TOTAL_DAMAGE_DONE_H2H'
});
const matchID = 144;

export const load = (async () => {
	const data = await getDefaultVisual(config, matchID);
	return {
		team1: data.data[100],
		team2: data.data[200],
		maxDamage: data.data.maxDamage
	};
}) satisfies PageServerLoad;

async function getDefaultVisual(config: string, matchID: number) {
	const apiResponse = await fetch(`http://localhost:3000/getVisual/${matchID}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: config
	});

	if (!apiResponse.ok) {
		error(apiResponse.status);
	}
	return await apiResponse.json();
}
