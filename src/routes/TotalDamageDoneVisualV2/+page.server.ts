import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const reqBody = JSON.stringify({
		isCustom: false,
		gameID: 310,
		visualName: 'TOTAL_DAMAGE_DONE_H2H',
	});

	// 	const reqBody = JSON.stringify({
	// 	isCustom: true,
	// 	visualFormat: 'SPOTLIGHT',
	// 	gameID: 310,
	// 	visualName: 'TOTAL_DAMAGE_DONE_H2H',
	// 	desiredPlayers: ['DYN Top'],
	// 	desiredStats: ['VISION_SCORE', 'WARD_KILLED']
	// });

	const apiResponse = await fetch('http://localhost:3000/getVisual', {
		method: "POST",
		headers: {
			"X-Powered-By": "Express",
			"Content-Type": "application/json; charset=utf-8"
		},
		body: reqBody
	});

	if (apiResponse.ok) {
		const data = await apiResponse.json();
		return {
			team1: data.data[100],
			team2: data.data[200],
			maxDamage: data.data.maxDamage
		};
	} else {
		error(apiResponse.status);
	}
}) satisfies PageServerLoad;

// type VisualRequest = {
//     isCustom: boolean;
//     gameID: number;
// }

// type CustomVisualReq = {
//     isCustom: boolean;
//     gameID: number;
//     desiredStats: string[];
//     visualFormat: "SPOTLIGHT" | "HEAD_TO_HEAD";
//     desiredPlayers?: string[] | ... 1 more ... | undefined;
// }

// type DefaultVisualReq = {
//     [x: string]: unknown;
//     isCustom: boolean;
//     gameID: number;
//     visualName: "TOTAL_DAMAGE_DONE_H2H";
// }
