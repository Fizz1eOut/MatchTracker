export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Team {
  id: number;
  name: string;
  crest: string;
}

export interface Scorer {
  player: Player;
  team: Team;
  numberOfGoals: number;
  assists?: number;
  penalties?: number;
}

export interface ScorerSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: string | null;
}

export interface ScorerCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  area: Area;
}

export interface ScorerResponse {
  count: number;
  competition: ScorerCompetition;
  season: ScorerSeason;
  scorers: Scorer[];
}
