import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiResponse } from '$lib/server/schemas';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const matchId = data.get('matchId');
		const apiResponse = await fetch(`http://localhost:3000/connectMatch/${matchId}`, {
			method: 'POST'
		});

		if (apiResponse.ok) {
			const matchInfo = (await apiResponse.json()) as ApiResponse;

			return { success: true, matchInfo };
		} else return error(apiResponse.status, apiResponse.statusText)
	}
} satisfies Actions;
