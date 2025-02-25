<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import MatchItem from '@/components/Content/MatchList/MatchItem.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface LeagueMatchesProps {
    league: { name: string; emblem: string; matches: Match[] };
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<LeagueMatchesProps>();
</script>

<template>
  <div class="league">
    <app-underlay>
      <app-container size="sm">
        <div class="league-matches">
          <div class="league-matches__header">
            <app-image 
              v-if="league.emblem" 
              :imageUrl="league.emblem" 
              :alt="league.name"
              class="league-matches__logo" 
            />
            <div class="league-matches__row">
              <div class="league-matches__сountry">{{ league.matches[0].area.name }}</div>
              <app-subtitle>{{ league.name }}</app-subtitle>
            </div>
          </div>
          <ul class="league-matches__list">
            <MatchItem 
              v-for="match in league.matches" 
              :key="match.id" 
              :match="match"
              :formatMatchTime="formatMatchTime" 
              :isOngoing="isOngoing" 
            />
          </ul>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .league:not(:last-child) {
    margin-bottom: 20px;
  }
  .league-matches {
    width: 100%;
  }
  .league-matches:not(:last-child) {
    margin-bottom: 20px;
  }
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
  .league-matches__list > *:not(:last-child) {
    margin-bottom: 20px;
  }
</style>
