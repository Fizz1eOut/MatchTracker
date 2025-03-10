export interface TeamShort {
  id: number;
  name: string;
  crest: string;
}

export interface Area {
  id?: number;
  name: string;
  code?: string;
  flag?: string;
}

export interface Competition {
  id: number;
  name: string;
  emblem?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
  area: Area;
  coach: {
    id: number;
    name: string;
    dateOfBirth: string;
  };
  runningCompetitions: Competition[];
  squad: {
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
  }[];
}

export type MatchStatus = 'SCHEDULED' | 'FINISHED' | 'TIMED' | 'IN_PLAY' | 'POSTPONED';
export type MatchWinner = 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW';

export interface Match {
  id: number;
  utcDate: string;
  status: MatchStatus;
  area: Area;
  competition: Competition;
  homeTeam: TeamShort;
  awayTeam: TeamShort;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    penalties?: {
      home: number | null;
      away: number | null;
    };
    winner: MatchWinner;
  };
}
export interface MatchesResponse {
  matches: Match[];
}
