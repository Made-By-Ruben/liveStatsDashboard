import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SpotlightedPlayer } from '$lib/server/schemas';

const config = JSON.stringify({
	isCustom: true,
	visualFormat: 'SPOTLIGHT',
	requestedPlayers: ['ZNT Middle'],
	requestedStats: ['CHAMPIONS_KILLED', 'ASSISTS', 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS']
});

const baseUrl = 'localhost';

export const load: PageServerLoad = async ({ cookies }) => {
	const data = await getCustomVisual(config);
	return {
		spotlightedPlayer: data.data as SpotlightedPlayer
	};
};

async function getCustomVisual(config: string) {
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
