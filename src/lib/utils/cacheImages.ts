import { PUBLIC_CDN_URL } from '$env/static/public';
import type { ActiveChamps } from '$lib/types/activeVisuals';

export function cacheImages(data: ActiveChamps) {
	data.forEach((champ) => {
		const portrait = new Image();
		portrait.src = `${PUBLIC_CDN_URL}${champ.championName}/square`;

		const splash = new Image();
		splash.src = `${PUBLIC_CDN_URL}${champ.championName}/splash-art`;
	});
}
