import nlcLogoGold from '$lib/assets/nlc/nlcLogoGold.avif';
import nlcBackground from '$lib/assets/nlc/nlcBg.avif';
import nlcBackgroundCropped from '$lib/assets/nlc/nlcCroppedBg.avif';
import nlcSpotlightLogo from '$lib/assets/nlc/star 2.avif';
import nlcTop from '$lib/assets/nlc/roleIcons/Top.avif';
import nlcJungle from '$lib/assets/nlc/roleIcons/Jungle.avif';
import nlcMiddle from '$lib/assets/nlc/roleIcons/Mid.avif';
import nlcBottom from '$lib/assets/nlc/roleIcons/Bot.avif';
import nlcSupport from '$lib/assets/nlc/roleIcons/Support.avif';

import rolLogo from '$lib/assets/rol/rolLogoVertical.avif';
import rolBackground from '$lib/assets/rol/rolBg.avif';
import rolBackgroundCropped from '$lib/assets/rol/croppedBg.avif';
import rolSpotlightLogo from '$lib/assets/rol/icon2026.png';
import rolTop from '$lib/assets/rol/roleIcons/Top.avif';
import rolJungle from '$lib/assets/rol/roleIcons/Jungle.avif';
import rolMiddle from '$lib/assets/rol/roleIcons/Mid.avif';
import rolBottom from '$lib/assets/rol/roleIcons/Bot.avif';
import rolSupport from '$lib/assets/rol/roleIcons/Support.avif';

const rolRoleIcons: Record<string, string> = {
	Top: rolTop,
	Jungle: rolJungle,
	Middle: rolMiddle,
	Bottom: rolBottom,
	Support: rolSupport
};

const nlcRoleIcons: Record<string, string> = {
	Top: nlcTop,
	Jungle: nlcJungle,
	Middle: nlcMiddle,
	Bottom: nlcBottom,
	Support: nlcSupport
};

type VisualAssets = 	{
		logo: string;
		background: string;
		backgroundCropped: string;
		spotlightLogo: string;
		roleIcons: Record<string, string>;
	}

type VisualAssetsSet = Record<
	'NLC' | 'ROL',
    VisualAssets
>;

export const visualAssets: VisualAssetsSet = {
	NLC: {
		logo: nlcLogoGold,
		background: nlcBackground,
		backgroundCropped: nlcBackgroundCropped,
		spotlightLogo: nlcSpotlightLogo,
		roleIcons: nlcRoleIcons
	},
	ROL: {
		logo: rolLogo,
		background: rolBackground,
		backgroundCropped: rolBackgroundCropped,
		roleIcons: rolRoleIcons,
		spotlightLogo: rolSpotlightLogo
	}
};

export function getVisualAssets(style: string | null | undefined): VisualAssets {
	return visualAssets[style === 'NLC' ? 'NLC' : 'ROL'];
}
