import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const config = JSON.stringify({
	isCustom: true,
	visualFormat: 'SPOTLIGHT',
    requestedPlayers: ['SNSH Top'],
	requestedStats: ["TOTAL_DAMAGE_DEALT", "TOTAL_DAMAGE_TAKEN", "TOTAL_DAMAGE_DEALT_TO_TURRETS", "TOTAL_DAMAGE_DEALT_TO_EPIC_MONSTERS"]
});
const matchID = 100;

export const load = (async () => {
	const data = await getCustomVisual(config, matchID);
	return {
        spotlightedPlayer: data.data
    };
}) satisfies PageServerLoad;

async function getCustomVisual(config: string, matchID: number) {
	const apiResponse = await fetch(`http://localhost:3000/getVisual/${matchID}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: config
	});

	if (!apiResponse.ok) {
		error(apiResponse.status);
	}

	return await apiResponse.json();
}
