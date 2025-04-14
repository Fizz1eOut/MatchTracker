<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface CompetitionItemProps {
    competition: Competition;
  }
  defineProps<CompetitionItemProps>();
</script>

<template>
  <div class="competition">
    <app-underlay>
      <app-container>
        <div class="competition__content">
          <app-image :image-url="competition.emblem" class="competition__img" />
          <div class="competition__name">{{ competition.name }}</div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .competition__content {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .competition__img {
    width: 100%;
    height: 150px;
  }
  .competition__name {
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: var(--color-white)
  }
  @media (max-width: 768px) {
    .competition__name {
      font-size: 14px;
    }
    .competition__content {
      height: 170px;
    }
    .competition__img {
      height: 120px;
    }
  }
  @media (max-width: 442px) {
    .competition__content {
      height: 200px;
    }
    .competition__img {
      width: 150px;
      height: 150px;
    }
  }
</style>
