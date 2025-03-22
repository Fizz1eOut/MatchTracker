import { fetchData } from '@/modules/http';

const API_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export interface League {
  id: number;
  name: string;
  code: string;
  emblem: string;
}

export const getLeagues = async (): Promise<League[]> => {
  const response = await fetchData<{ competitions: League[] }>(API_URL);

  if (!response || !response.competitions) {
    throw new Error('Invalid API response format');
  }

  return response.competitions;
};
