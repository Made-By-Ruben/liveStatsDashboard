import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { Visual } from '$lib/server/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allowedStats, roles, teams } from '$lib/server/staticInfo';

export const load = (async () => {
	const apiResponse = await fetch(`${PUBLIC_SERVER_URL}prepareVisuals`);
	if (!apiResponse.ok) {
		throw new Error(apiResponse.statusText);
	}

	try {
		const visuals = (await apiResponse.json()).data as Visual[];
		return {
			visuals,
			allowedStats,
			teams,
			roles
		};
	} catch (error) {
		throw new Error('Error while parsing data');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const visual = data.get('selectedVisual');
		if (!visual) {
			return fail(400, { visual, missing: true });
		}

		const requestInit: RequestInit = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: visual
		};
		const apiResponse = await fetch(`${PUBLIC_SERVER_URL}prepareVisuals`, requestInit);
		if (!apiResponse.ok) {
			return fail(apiResponse.status, { visual });
		}
		return await apiResponse.json();
	}
} satisfies Actions;
