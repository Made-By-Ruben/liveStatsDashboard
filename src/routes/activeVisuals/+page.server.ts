import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const apiResponse = await fetch(`${PUBLIC_SERVER_URL}companionRelay/initialChampions`)

    if (apiResponse.ok) {
        const champions = (await apiResponse.json()).data
        return {champions};
    }
    return {};
}) satisfies PageServerLoad;