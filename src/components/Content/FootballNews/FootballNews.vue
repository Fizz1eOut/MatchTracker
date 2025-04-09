<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { News } from '@/interface/news.interface';
  import { getNews } from '@/api/news/news';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import NewsCard from '@/components/Content/FootballNews/NewsCard.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  const newsList = ref<News[]>([]); 
  const nextPage = ref<string | undefined>(undefined);
  const isLoading = ref(false);

  const fetchNews = async (page?: string) => {
    try {
      isLoading.value = true;
      const scrollY = window.scrollY;
      const response = await getNews(page);
      newsList.value = [...newsList.value, ...response.results];
      
      nextPage.value = response.nextPage;
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchNews();
  });

  const loadNextPage = () => {
    if (nextPage.value) {
      fetchNews(nextPage.value);
    }
  };
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
        Latest news
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
  @media (max-width: 1252px) {
    .football-news__item {
      flex: 1 0 300px;
    }
  }
</style>
