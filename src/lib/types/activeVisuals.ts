export type VisualState = null | 'animateIn' | 'live' | 'animateOut';
export type CompanionEvent = {
	visualType: 'defaultVisuals' | 'customVisuals' | 'postGameVisuals';
	visualName: number | string;
};
export type ActiveChamps = {
	championName: string;
}[];
