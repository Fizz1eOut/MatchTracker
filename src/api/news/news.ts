import { fetchData } from '@/modules/http';
import type { NewsResponse, News } from '@/interface/news.interface';

const API_URL = 'https://newsdata.io/api/1/news';
const API_KEY = 'pub_7669077d9a02de94a1911f8c2679b844529d5';

export const getNews = async (team?: string, page?: string): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    category: 'sports',
    language: 'en',
    q: team ? `football AND ${team}` : 'football',
    size: '10',
  });

  if (page) {
    params.append('page', page);
  }

  const url = `${API_URL}?${params.toString()}`;

  try {
    const response = await fetchData<NewsResponse>(url);

    const filteredNews: News[] = [];
    const seenArticles = new Set<string>();

    for (const article of response.results) {
      const title = article.title?.toLowerCase().trim() || '';
      const description = article.description?.toLowerCase().trim() || '';
      const identifier = `${title}-${description}`;

      if ((title.includes(team?.toLowerCase() || '') || description.includes(team?.toLowerCase() || '')) 
          && !seenArticles.has(identifier)) {
        seenArticles.add(identifier);
        filteredNews.push(article);
      }
    }

    return { ...response, results: filteredNews };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
