import { fetchData } from '@/modules/http';
import type { MatchesResponse, Match } from '@/interface/matches.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/';

export const getMatches = async (): Promise<Match[]> => {
  const url = `${API_URL}matches`;
  const response = await fetchData<MatchesResponse>(url);

  if (!response || !response.matches) {
    throw new Error('Неверный формат ответа API');
  }

  return response.matches;
};
