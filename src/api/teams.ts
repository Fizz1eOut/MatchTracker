import { fetchData } from '@/modules/http';
import type { Team } from '@/interface/teams.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export const getTeams = async (search: string = '', page: number = 1, league: string = 'CL'): Promise<{ teams: Team[]; totalPages: number }> => {
  if (!league) {
    throw new Error('Не указан код лиги');
  }

  const params = new URLSearchParams({
    search: search,
    page: String(page),
  });

  const url = `${API_URL}/${league}/teams?${params.toString()}`;
  return fetchData<{ teams: Team[]; totalPages: number }>(url);
};
