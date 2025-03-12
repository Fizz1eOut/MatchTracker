export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
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
  coach: Coach;
  runningCompetitions: Competition[];
  squad: Player[];
}
