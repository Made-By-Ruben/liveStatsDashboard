export type VisualState = null | 'animateIn' | 'live' | 'stingerOut' | 'animateOut';
export type CompanionEvent = {
	visualType: 'defaultVisuals' | 'customVisuals' | 'postGameVisuals';
	visualName: number | string;
};
export type ActiveChamps = {
	championName: string;
}[];
