export interface Team {
  id: number;
  name: string;
}

export interface Match {
  area: {
    name: string;
  }
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'FINISHED' | 'TIMED' | 'IN_PLAY' | 'POSTPONED';
   competition: {
    id: number;
    name: string;
    emblem: string;
  };
  homeTeam: {
    id: number;
    name: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}


export interface MatchesResponse {
  matches: Match[];
}
