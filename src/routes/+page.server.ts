import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_URL } from '$env/static/public';

type MatchInfo = {
	matchLabel: string;
	tournamentName: 'ROL' | 'NLC';
};

type ApiResponse = {
	success: boolean;
	message: string;
	data: MatchInfo
}

export const load = (async ({ cookies }) => {
	return {
		visualStyle: cookies.get('visualStyle')
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const matchId = data.get('matchId');
		const apiResponse = await fetch(`${PUBLIC_SERVER_URL}connectMatch/${matchId}`, {
			method: 'POST'
		});

		if (apiResponse.ok) {
			const response = (await apiResponse.json()) as ApiResponse;

			const matchLabel = response.data.matchLabel;
			const visualStyle = response.data.tournamentName;

			return { success: true, matchLabel, visualStyle };
		} else return error(apiResponse.status, apiResponse.statusText);
	}
} satisfies Actions;
