import { fetchData } from '@/modules/http';
import type { Team } from '@/interface/teams.interface';

const API_URL = 'https://vue-football-proxy.onrender.com/api/teams';

export const getTeamById = async (teamId: string): Promise<Team> => {
  if (!teamId) {
    throw new Error('Team ID not specified');
  }

  const url = `${API_URL}/${teamId}`;
  const response = await fetchData<Team>(url);
  return response;
};
