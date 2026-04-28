import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const reqBody = JSON.stringify({
		isCustom: false,
		visualName: 'TOTAL_DAMAGE_DONE_H2H'
	});

	const apiResponse = await fetch('http://localhost:3000/getVisual/104', {
		method: 'POST',
		headers: {
			'X-Powered-By': 'Express',
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: reqBody
	});

	if (apiResponse.ok) {
		const data = await apiResponse.json();
		console.log(data)
		return {
			team1: data.data[100],
			team2: data.data[200],
			maxDamage: data.data.maxDamage
		};
	} else {
		error(apiResponse.status);
	}
}) satisfies PageServerLoad;
