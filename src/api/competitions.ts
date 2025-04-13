import { fetchData } from '@/modules/http';
import type { CompetitionsResponse  } from '@/interface/сompetitions.interface';

const BASE_URL = 'https://vue-football-proxy.onrender.com/api/competitions';

export const getCompetitions = async (): Promise<CompetitionsResponse> => {
  const url = `${BASE_URL}`;
  return await fetchData<CompetitionsResponse>(url);
};
