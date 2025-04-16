export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
  winner?: string | null;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  currentSeason: Season;
  area: Area;
}

export interface CompetitionsResponse {
  competitions: Competition[];
}
