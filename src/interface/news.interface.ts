export interface News {
  title: string;
  description: string;
  content: string;
  link: string;
  image_url?: string;
  pubDate: string;
  source_id: string;
  source_name: string;
  country: string[];
  category: string[];
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: News[];
  nextPage?: string;
}
