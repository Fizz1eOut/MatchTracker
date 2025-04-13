export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface CompetitionsResponse {
  competitions: Competition[];
}
