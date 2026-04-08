import type { PageServerLoad } from './$types';

export const load = (async () => {
	const apiResponse = await fetch(
		'http://localhost:3000/analyticalVisuals/TOTAL_DAMAGE_DEALT_TO_CHAMPIONS/306'
	);
	if (apiResponse.ok) {
		const data = await apiResponse.json();
		return { data: data.data };
	} else {
		console.log('something went wrong');
	}
	return {};
}) satisfies PageServerLoad;
