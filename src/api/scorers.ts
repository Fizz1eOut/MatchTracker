import { fetchData } from '@/modules/http';
import type { ScorerResponse } from '@/interface/scorers.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api';

export const getTopScorers = async (leagueId: string): Promise<ScorerResponse> => {
  const url = `${API_URL}/competitions/${leagueId}/scorers`;
  return await fetchData<ScorerResponse>(url);
};
