export interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
}

export interface Team {
  id: number;
  shortName: string;
  crest: string;
}

export interface Scorer {
  player: Player;
  team: Team;
  playedMatches: number;
  assists: number;
  penalties: number;
  goals: number;
}

export interface ScorerResponse {
  scorers: Scorer[];
}
