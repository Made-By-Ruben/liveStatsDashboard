import nlcLogoGold from '$lib/assets/nlc/nlcLogoGold.avif';
import nlcBackground from '$lib/assets/nlc/nlcBg.avif';
import nlcBackgroundCropped from '$lib/assets/nlc/nlcCroppedBg.avif';
import nlcSpotlightLogo from '$lib/assets/nlc/star 2.avif';
import nlcTop from '$lib/assets/nlc/roleIcons/Top.avif';
import nlcJungle from '$lib/assets/nlc/roleIcons/Jungle.avif';
import nlcMiddle from '$lib/assets/nlc/roleIcons/Mid.avif';
import nlcBottom from '$lib/assets/nlc/roleIcons/Bot.avif';
import nlcSupport from '$lib/assets/nlc/roleIcons/Support.avif';

import nlcArcticPandas from '$lib/assets/nlc/teamIcons/AP.avif';
import nlcArcticPandasLoss from '$lib/assets/nlc/teamIcons/AP_LOSS.avif';
import nlcBulldog from '$lib/assets/nlc/teamIcons/BDG.avif';
import nlcBulldogLoss from '$lib/assets/nlc/teamIcons/BDG_LOSS.avif';
import nlcDeerGaming from '$lib/assets/nlc/teamIcons/DEER.avif';
import nlcDeerGamingLoss from '$lib/assets/nlc/teamIcons/DEER_LOSS.avif';
import nlcDmg from '$lib/assets/nlc/teamIcons/DMG.avif';
import nlcDmgLoss from '$lib/assets/nlc/teamIcons/DMG_LOSS.avif';
import nlcLeo from '$lib/assets/nlc/teamIcons/LEO.avif';
import nlcLeoLoss from '$lib/assets/nlc/teamIcons/LEO_LOSS.avif';
import nlcLundqvist from '$lib/assets/nlc/teamIcons/LLS.avif';
import nlcLundqvistLoss from '$lib/assets/nlc/teamIcons/LLS_LOSS.avif';
import nlcRuddy from '$lib/assets/nlc/teamIcons/RUD.avif';
import nlcRuddyLoss from '$lib/assets/nlc/teamIcons/RUD_LOSS.avif';
import nlcVerdant from '$lib/assets/nlc/teamIcons/VER.avif';
import nlcVerdantLoss from '$lib/assets/nlc/teamIcons/VER_LOSS.avif';

import rolLogo from '$lib/assets/rol/rolLogoVertical.avif';
import rolBackground from '$lib/assets/rol/rolBg.avif';
import rolBackgroundCropped from '$lib/assets/rol/rolCroppedBg.avif';
import rolSpotlightLogo from '$lib/assets/rol/icon2026.png';
import rolTop from '$lib/assets/rol/roleIcons/Top.avif';
import rolJungle from '$lib/assets/rol/roleIcons/Jungle.avif';
import rolMiddle from '$lib/assets/rol/roleIcons/Mid.avif';
import rolBottom from '$lib/assets/rol/roleIcons/Bot.avif';
import rolSupport from '$lib/assets/rol/roleIcons/Support.avif';

import rolBandits from '$lib/assets/rol/teamIcons/BAN.avif';
import rolBanditsLoss from '$lib/assets/rol/teamIcons/BAN_LOSS.avif';
import rolDynasty from '$lib/assets/rol/teamIcons/DYN.avif';
import rolDynastyLoss from '$lib/assets/rol/teamIcons/DYN_LOSS.avif';
import rolFrites from '$lib/assets/rol/teamIcons/FEC.avif';
import rolFritesLoss from '$lib/assets/rol/teamIcons/FEC_LOSS.avif';
import rolMcon from '$lib/assets/rol/teamIcons/MCON.avif';
import rolMconLoss from '$lib/assets/rol/teamIcons/MCON_LOSS.avif';
import rolMyth from '$lib/assets/rol/teamIcons/MYTH.avif';
import rolMythLoss from '$lib/assets/rol/teamIcons/MYTH_LOSS.avif';
import rolOnceUponATeam from '$lib/assets/rol/teamIcons/OUAT.avif';
import rolOnceUponATeamLoss from '$lib/assets/rol/teamIcons/OUAT_LOSS.avif';
import rolRichGang from '$lib/assets/rol/teamIcons/RG.avif';
import rolSnooze from '$lib/assets/rol/teamIcons/SE.avif';
import rolSnoozeLoss from '$lib/assets/rol/teamIcons/SE_LOSS.avif';
import rolSenshi from '$lib/assets/rol/teamIcons/SNSH.avif';
import rolSenshiLoss from '$lib/assets/rol/teamIcons/SNSH_LOSS.avif';
import rolZennit from '$lib/assets/rol/teamIcons/ZNT.avif';
import rolZennitLoss from '$lib/assets/rol/teamIcons/ZNT_LOSS.avif';

const rolRoleIcons: Record<string, string> = {
	Top: rolTop,
	Jungle: rolJungle,
	Middle: rolMiddle,
	Bottom: rolBottom,
	Support: rolSupport
};

const rolTeamIcons: Record<string, string> = {
	BAN: rolBandits,
	DYN: rolDynasty,
	FEC: rolFrites,
	MCON: rolMcon,
	MYTH: rolMyth,
	OUAT: rolOnceUponATeam,
	RG: rolRichGang,
	SE: rolSnooze,
	SNSH: rolSenshi,
	ZNT: rolZennit
};

// RG is the one team with no dimmed artwork, so it keeps its normal mark on a loss.
const rolTeamIconsLoss: Record<string, string> = {
	BAN: rolBanditsLoss,
	DYN: rolDynastyLoss,
	FEC: rolFritesLoss,
	MCON: rolMconLoss,
	MYTH: rolMythLoss,
	OUAT: rolOnceUponATeamLoss,
	SE: rolSnoozeLoss,
	SNSH: rolSenshiLoss,
	ZNT: rolZennitLoss
};

const nlcRoleIcons: Record<string, string> = {
	Top: nlcTop,
	Jungle: nlcJungle,
	Middle: nlcMiddle,
	Bottom: nlcBottom,
	Support: nlcSupport
};

const nlcTeamIcons: Record<string, string> = {
	AP: nlcArcticPandas,
	BDG: nlcBulldog,
	DEER: nlcDeerGaming,
	DMG: nlcDmg,
	LEO: nlcLeo,
	LLS: nlcLundqvist,
	RUD: nlcRuddy,
	VER: nlcVerdant
};

const nlcTeamIconsLoss: Record<string, string> = {
	AP: nlcArcticPandasLoss,
	BDG: nlcBulldogLoss,
	DEER: nlcDeerGamingLoss,
	DMG: nlcDmgLoss,
	LEO: nlcLeoLoss,
	LLS: nlcLundqvistLoss,
	RUD: nlcRuddyLoss,
	VER: nlcVerdantLoss
};

type VisualAssets = {
	logo: string;
	background: string;
	backgroundCropped: string;
	spotlightLogo: string;
	roleIcons: Record<string, string>;
	teamIcons: Record<string, string>;
	teamIconsLoss: Record<string, string>;
};

type VisualAssetsSet = Record<'NLC' | 'ROL', VisualAssets>;

export const visualAssets: VisualAssetsSet = {
	NLC: {
		logo: nlcLogoGold,
		background: nlcBackground,
		backgroundCropped: nlcBackgroundCropped,
		spotlightLogo: nlcSpotlightLogo,
		roleIcons: nlcRoleIcons,
		teamIcons: nlcTeamIcons,
		teamIconsLoss: nlcTeamIconsLoss
	},
	ROL: {
		logo: rolLogo,
		background: rolBackground,
		backgroundCropped: rolBackgroundCropped,
		roleIcons: rolRoleIcons,
		spotlightLogo: rolSpotlightLogo,
		teamIcons: rolTeamIcons,
		teamIconsLoss: rolTeamIconsLoss
	}
};

export function getVisualAssets(style: string | null | undefined): VisualAssets {
	return visualAssets[style === 'NLC' ? 'NLC' : 'ROL'];
}

export function getTeamIcon(
	style: string | null | undefined,
	teamName: string,
	teamHasWon: boolean | null
): string {
	const assets = getVisualAssets(style);
	if (teamHasWon === false && assets.teamIconsLoss[teamName]) return assets.teamIconsLoss[teamName];
	return assets.teamIcons[teamName] ?? rolLogo;
}
