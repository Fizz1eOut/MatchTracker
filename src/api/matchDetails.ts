import { fetchData } from '@/modules/http';
import type { Match } from '@/interface/matches.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/';

export const getMatchDetails = async (matchId: string): Promise<Match> => {
  const url = `${API_URL}matches/${matchId}`;
  const response = await fetchData<Match>(url);

  console.log('API Response:', response);

  if (!response || !response.id) {
    throw new Error('Invalid API response format');
  }

  return response;
};
