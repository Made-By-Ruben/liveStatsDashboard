export type FinishedGameMetaInfo = {
	gameState: 'finished';
	winningTeam: 100 | 200;
	gameID: number;
	gameTimeSec: number;
	gameTimeDisplay: string;
};

export type LiveGameMetaInfo = {
	gameState: 'live';
	gameID: number;
	gameTimeSec: number;
	gameTimeDisplay: string;
};

export type TeamInfo = {
	teamName: string;
	teamServerID: number;
	teamScore: number;
	teamHasWon: boolean | null;
};

export type ScalarRow = {
	kind: 'scalar';
	label: string;
	team100Value: {
		raw: number;
		display: string;
	};
	team200Value: {
		raw: number;
		display: string;
	};
};

export type BansRow = {
	kind: 'bans';
	label: string;
	team100Value: string[];
	team200Value: string[];
};

export type KDARow = {
	kind: 'KDA';
	label: string;
	team100Value: {
		kills: number;
		deaths: number;
		assists: number;
		display: string;
	};
	team200Value: {
		kills: number;
		deaths: number;
		assists: number;
		display: string;
	};
};

export type ComparisonRow = ScalarRow | BansRow | KDARow;

export type FilteredPlayerData = {
	playerName: string;
	championName: string;
	teamID: number;
	filteredStats: Record<string, number>;
};

export type GoldDiffGraph = {
	lowestValue: number;
	highestValue: number;
	goldDiffValues: number[];
};

export type PostMatchStats = {
	meta: FinishedGameMetaInfo | LiveGameMetaInfo;
	teams: {
		100: TeamInfo;
		200: TeamInfo;
	};
	comparisonRows: ComparisonRow[];
	totalDamageDone: {
		100: FilteredPlayerData[];
		200: FilteredPlayerData[];
	};
	goldDiffGraph: GoldDiffGraph;
};
