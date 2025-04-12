<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { News } from '@/interface/news.interface';
  import type { Team } from '@/interface/teams.interface';
  import { getNews } from '@/api/news/news';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import NewsCard from '@/components/Content/NewsFootball/NewsCard.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface NewsTeamProps {
    team: Team;
  }
  const props = defineProps<NewsTeamProps>();

  const newsList = ref<News[]>([]); 
  const nextPage = ref<string | undefined>(undefined);
  const isLoading = ref(false);

  const fetchNews = async (page?: string) => {
    try {
      isLoading.value = true;
      
      const teamSearchTerm = props.team.name || props.team.shortName;
      console.log('Fetching news for team:', teamSearchTerm);
      
      const response = await getNews(teamSearchTerm, page);
      
      if (response.results && response.results.length > 0) {
        newsList.value = [...newsList.value, ...response.results];
        nextPage.value = response.nextPage;
      } else {
        console.warn('No news found for team:', teamSearchTerm);  
        nextPage.value = undefined;
      }

      const scrollY = window.scrollY;
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const loadNextPage = () => {
    if (nextPage.value) {
      fetchNews(nextPage.value);
    }
  };

  onMounted(() => {
    fetchNews();
  });
</script>

<template>
  <app-loading-spinner
    v-if="isLoading" 
    size="60px" 
    borderWidth="5px"
    height="100px" />
  <div v-else-if="newsList.length > 0">
    <div class="football-news">
      <app-title>
        Today's News
      </app-title>

      <ul class="football-news__list">
        <news-card  
          v-for="news in newsList"
          :key="news.link"
          :news="news"
          @naxtPage="loadNextPage"
          class="football-news__item"
        />
      </ul>

      <div class="football-news__button">
        <app-button 
          outline
          v-if="nextPage" 
          :disabled="isLoading" 
          @click="loadNextPage"
          class="btn"
        >
          {{ isLoading ? 'Loading...' : 'Load More News' }}
        </app-button>
      </div>
    </div>
  </div>
  <div v-else class="error">No news found for team: {{ props.team.shortName }}</div>
</template>

<style scoped>
  .football-news {
    margin-top: 40px
  }
  .football-news__list {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
  .football-news__item {
    flex: 0 1 400px;
  }
  .football-news__button {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn {
    width: 160px;
    font-size: 20px;
  }
  .error {
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 400px;
    color: var(--color-white);
  }
  @media (max-width: 1252px) {
    .football-news__item {
      flex: 1 0 300px;
    }
  }
</style>
