<script setup lang="ts">
  import type { News } from '@/interface/news.interface';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppImage from '@/components/Base/AppImage.vue';

  interface NewsCardProps {
    news: News;
  }
  defineProps<NewsCardProps>();
</script>

<template>
  <li class="news-card">
    <a :href="news.link" target="_blank">
      <app-underlay>
        <app-container>
          <div class="news-card__content">
            <div class="news-card__image">
              <app-image class="img" :imageUrl="news.image_url" />
            </div>
            <app-subtitle class="news-card__title">{{ news.title }}</app-subtitle>
            <div class="news-card__text">{{ news.description }}</div>
            <div class="news-card__info">
              <div class="news-card__source">{{ news.source_name }}</div>
              <div class="news-card__date">{{ news.pubDate }}</div>
            </div>
          </div>
        </app-container>
      </app-underlay>
    </a>
  </li>
</template>

<style scoped>
  .news-card__image {
    width: 100%;
  }
  .news-card__image img {
    width: 100%;
    height: 200px;
  }
  .news-card__content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    flex-direction: column;
    height: 420px;
  }
  .news-card__content {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .news-card__content:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .news-card__content::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
      transition: left 0.5s ease;
  }
  .news-card__content:hover::before {
      left: 100%;
  }
  .news-card__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    min-height: 57px;
  }
  .news-card__text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 14px;
    font-weight: 400; 
    min-height: 50px;
    color: var(--color-gray);
  }
  .news-card__info {
    font-size: 18px;  
    font-weight: 400;
    color: var(--color-gray);
  }
  .news-card__source {
  }
  .news-card__date {
    margin-top: 10px;
    color: var(--color-white);
  }
  @media (max-width: 499px) {
    .news-card__title{
      min-height: 46px;
    }
  }
</style>
