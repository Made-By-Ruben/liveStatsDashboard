import type { LayoutServerLoad } from './$types';

export const load = (async ({cookies}) => {
    return {
        visualStyle: cookies.get('visualStyle')
    };
}) satisfies LayoutServerLoad;