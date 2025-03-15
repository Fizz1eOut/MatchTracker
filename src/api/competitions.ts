import { fetchData } from '@/modules/http';
import type { Standings } from '@/interface/standings.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export const getCompetitionStandings = async (competitionId: number): Promise<Standings> => {
  if (!competitionId) {
    throw new Error('Competition ID not specified');
  }

  const url = `${API_URL}/${competitionId}/standings`;
  return await fetchData<Standings>(url);
};
