import { fetchData } from '@/modules/http';
import type { NewsResponse, News } from '@/interface/news.interface';

const API_URL = 'https://newsdata.io/api/1/news';
const API_KEY = 'pub_7669077d9a02de94a1911f8c2679b844529d5';

export const getNews = async (page?: string): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    category: 'sports',
    language: 'en',
    q: 'football',
    size: '10',
  });

  if (page) {
    params.append('page', page);
  }

  const url = `${API_URL}?${params.toString()}`;
  const response = await fetchData<NewsResponse>(url);

  const uniqueNews: News[] = [];
  const seenTitles = new Set();
  
  for (const article of response.results) {
    const title = article.title.toLowerCase().trim();
    
    if (!seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueNews.push(article);
    }
  }
  
  return { ...response, results: uniqueNews };
};
