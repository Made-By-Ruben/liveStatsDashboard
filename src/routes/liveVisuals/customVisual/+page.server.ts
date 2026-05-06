import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const config = JSON.stringify({
	isCustom: true,
	visualFormat: 'SPOTLIGHT',
    requestedPlayers: ['ZNT Middle'],
	requestedStats: ["CHAMPIONS_KILLED", "ASSISTS", "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS"]
});

export const load = (async ({cookies}) => {
		const matchId = Number(cookies.get('matchId'));

	if (matchId === undefined) {
		error(400);
	}

	const data = await getCustomVisual(config, matchId);
	return {
        spotlightedPlayer: data.data
    };
}) satisfies PageServerLoad;

async function getCustomVisual(config: string, matchId: number) {
	const apiResponse = await fetch(`http://localhost:3000/getVisual/${matchId}`, {
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
