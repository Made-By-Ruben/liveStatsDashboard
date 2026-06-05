import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const apiResponse = await fetch(`${PUBLIC_SERVER_URL}prepareVisuals`)
    if (!apiResponse.ok) {
        throw new Error(apiResponse.statusText)
    }

    try {
        const data = await apiResponse.json();
        return {
            data
        };
    } catch (error) {
        throw new Error("Error while parsing data")
    }
}) satisfies PageServerLoad;