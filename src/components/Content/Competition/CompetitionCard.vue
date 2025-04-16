<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppImage from '@/components/Base/AppImage.vue';

  interface CompetitionCardProps {
    competition: Competition;
  }
  const props = defineProps<CompetitionCardProps>();
  console.log('Competition prop:', props.competition);
</script>

<template>
  <div class="competition-card">
    <app-underlay>
      <app-container>
        <div class="competition-card__body">
          <div class="competition-card__emblem">
            <app-image :image-url="competition.emblem" class="competition-card__image--emblem" />
          </div>

          <div class="competition-card__content">
            <app-subtitle class="competition-card__subtitle">{{ competition.name }}</app-subtitle>

            <div class="competition-card__region">
              <app-image :image-url="competition.area.flag" class="competition-card__image--flag" />
              <div class="competition-card__name">{{ competition.area.name }}</div>
            </div>

            <div class="competition-card__timeline">
              <div class="timeline__start text"><span>Start:</span> {{ competition.currentSeason.startDate }}</div>
              <div class="timeline__end text"><span>End:</span> {{ competition.currentSeason.endDate }}</div>
            </div>

            <div v-if="competition.area.winner" class="competition-card__winner text"><span>Winner:</span>{{ competition.area.winner }}</div>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .competition-card__body {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  .competition-card__image--emblem {
    padding: 10px;
    width: 150px;
    height: 150px;
    background-color: var(--color-white);
  }
  .competition-card__content > *:not(:last-child) {
    margin-bottom: 10px;
  }
  .competition-card__region {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .competition-card__image--flag {
    width: 40px;
    height: 40px;
  }
  .competition-card__name {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  .competition-card__timeline {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px; 
  }
  .text span {
    color: var(--color-gray);
  }
  .text {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  @media (max-width: 768px) {
    .competition-card__body {
      gap: 20px;
    }
    .text {
      font-size: 16px;
    }
    .competition-card__name {
      font-size: 16px;
    }
  }
  @media (max-width: 516px) {
    .competition-card__image--emblem {
      width: 100px;
      height: 100px;
    }
    .competition-card__image--flag {
      width: 30px;
      height: 30px;
    }
    .competition-card__timeline {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 433px) {
    .competition-card__body {
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .competition-card__region {
      justify-content: center;
    }
  }
</style>
