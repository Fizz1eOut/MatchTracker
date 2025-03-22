import { fetchData } from '@/modules/http';
import type { MatchesResponse, Match } from '@/interface/matches.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export const getMatches = async (leagueId?: string): Promise<Match[]> => {
  const url = `${API_URL}/${leagueId}/matches`;

  const response = await fetchData<MatchesResponse>(url);

  if (!response || !response.matches) {
    throw new Error('Invalid API response format');
  }

  return response.matches;
};
