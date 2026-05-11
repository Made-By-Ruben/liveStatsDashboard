export type SpotlightedPlayer = {
	championName: string;
	filteredStats: Record<string, number>;
	playerName: string;
	role: string;
	teamID: number;
};

export type ApiResponse = {
	success: boolean;
	message: string;
	data: string;
};