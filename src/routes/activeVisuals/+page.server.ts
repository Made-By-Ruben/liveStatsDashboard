import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	return {
		visualStyle: cookies.get('visualStyle')
	};
}) satisfies PageServerLoad;
