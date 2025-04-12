import { fetchData } from '@/modules/http';
import type { Standings } from '@/interface/competitions.interface';

const BASE_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export const getCompetitionStandings = async (competitionId?: number): Promise<Standings> => {
  const params = new URLSearchParams();

  if (competitionId) {
    params.append('competitionId', competitionId.toString());
  }

  const url = competitionId
    ? `${BASE_URL}/${competitionId}/standings?${params.toString()}`
    : `${BASE_URL}/standings?${params.toString()}`;

  return await fetchData<Standings>(url);
};
