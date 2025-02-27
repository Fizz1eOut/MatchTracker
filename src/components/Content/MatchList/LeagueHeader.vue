<script setup lang="ts">
  import AppImage from '@/components/Base/AppImage.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';

  interface LeagueHeaderProps {
    name: string;
    emblem: string | null;
    country: string;
  }
  defineProps<LeagueHeaderProps>();
</script>

<template>
  <div class="league-matches__header">
    <app-image 
      v-if="emblem" 
      :imageUrl="emblem" 
      :alt="name"
      class="league-matches__logo" 
    />
    <div class="league-matches__row">
      <div class="league-matches__country">{{ country }}</div>
      <app-subtitle>{{ name }}</app-subtitle>
    </div>
  </div>
</template>

<style scoped>
  .league-matches__header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .league-matches__сountry {
    font-size: 16px;
    color: var(--color-gray);
  }
  .league-matches__logo {
    width: 50px;
    height: 50px;
  }
</style>
