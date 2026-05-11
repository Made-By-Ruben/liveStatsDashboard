import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const config = JSON.stringify({
	isCustom: false,
	visualName: 'TOTAL_DAMAGE_DONE_H2H'
});

const baseUrl = 'localhost';

export const load = (async ({ cookies }) => {
	const data = await getDefaultVisual(config);
	return {
		team1: data.data[100],
		team2: data.data[200],
		maxDamage: data.data.maxDamage
	};
}) satisfies PageServerLoad;

async function getDefaultVisual(config: string) {
	const apiResponse = await fetch(`http://${baseUrl}:3000/getVisual`, {
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
