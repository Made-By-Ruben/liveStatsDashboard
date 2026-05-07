import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type SpotlightedPlayer = {
	championName: string;
	filteredStats: Record<string, number>;
	playerName: string;
	role: string;
	teamID: number;
};

const config = JSON.stringify({
	isCustom: true,
	visualFormat: 'SPOTLIGHT',
	requestedPlayers: ['ZNT Middle'],
	requestedStats: ['CHAMPIONS_KILLED', 'ASSISTS', 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']
});

const baseUrl = 'localhost';

export const load: PageServerLoad = async ({ cookies }) => {
	const matchId = Number(cookies.get('matchId'));

	if (matchId === undefined) {
		error(400);
	}

	const data = await getCustomVisual(config, matchId);
	return {
		spotlightedPlayer: data.data as SpotlightedPlayer
	};
};

async function getCustomVisual(config: string, matchId: number) {
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
