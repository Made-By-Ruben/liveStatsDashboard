import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { PageLoad } from './$types';

type GameInfo = {
	gameID: number;
	team100: {
		ID: number;
		name: string;
	};
	team200: {
		ID: number;
		name: string;
	};
};

export const load: PageLoad = (async ({ fetch, params }) => {
	const apiResponse = await fetch(`${PUBLIC_SERVER_URL}connectMatch/gameInfo`);
	if (!apiResponse.ok) {
		throw new Error(apiResponse.statusText);
	}

	const data = (await apiResponse.json()).data as GameInfo;

	return {
		gameInfo: data
	};
}) satisfies PageLoad;
