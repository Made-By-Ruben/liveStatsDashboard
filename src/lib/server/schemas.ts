export type ApiResponse = {
	success: boolean;
	message: string;
	data: string;
};

export type Visual = {
	visualID: number,
	visualLabel: string,
	visualConfig: {
		requestedPlayers: string[],
		requestedStats: string[],
		responseFormat: "spotlight" | "head2Head",
		visualId: number,
		visualName: string,
		selectedTeam: string,
		selectedRole: string,
	}
}