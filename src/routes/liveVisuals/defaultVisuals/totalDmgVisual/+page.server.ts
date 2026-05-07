import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const config = JSON.stringify({
	isCustom: false,
	visualName: 'TOTAL_DAMAGE_DONE_H2H'
});

const baseUrl = 'localhost';

export const load = (async ({ cookies }) => {
	const matchId = Number(cookies.get('matchId'));

	if (matchId === undefined) {
		error(400);
	}

	const data = await getDefaultVisual(config, matchId);
	return {
		team1: data.data[100],
		team2: data.data[200],
		maxDamage: data.data.maxDamage
	};
}) satisfies PageServerLoad;

async function getDefaultVisual(config: string, matchId: number) {
	const apiResponse = await fetch(`http://${baseUrl}:3000/getVisual/${matchId}`, {
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
