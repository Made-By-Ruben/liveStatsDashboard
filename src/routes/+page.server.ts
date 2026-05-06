import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const matchId = data.get('matchId')?.toString();
		console.log(matchId);
		if (matchId === undefined) {
			return { succes: false };
		}

		cookies.set('matchId', matchId, { path: '/' });

		return { success: true };
	}
} satisfies Actions;
