<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import LeagueHeader from '@/components/Content/MatchList/LeagueHeader.vue';
  import AppMatchCard from '@/components/Base/AppMatchCard.vue';
  import AppDivider from '@/components/Base/AppDivider.vue';

  interface LiveMatchProps {
    matchesByLeague: Record<number, { name: string; emblem: string; matches: Match[] }>;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<LiveMatchProps>();
</script>

<template>
  <div class="upcoming-match" v-if="Object.keys(matchesByLeague).length > 0">
    <app-title class="upcoming-match__title">Upcoming Showdown</app-title>
    <app-underlay>
      <app-container size="sm">
        <div class="upcoming-match__list">
          <div 
            v-for="(league, leagueId) in matchesByLeague"
            :key="leagueId" 
            class="upcoming-match__group"
          >
            <app-divider class="match-divider" />

            <league-header 
              :name="league.name" 
              :emblem="league.emblem" 
              :country="league.matches[0].area.name" 
            />
            <ul class="upcoming-match__items">
              <app-match-card
                v-for="match in league.matches"
                :key="match.id"
                :match="match"
                :formatMatchTime="formatMatchTime"
                :isOngoing="isOngoing"
                displayMode="score"
              />
            </ul>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .upcoming-match__title {
    margin-bottom: 30px
  }
  :deep(.league-matches__header) {
    justify-content: start;
    gap: 20px;
  }
  :deep(.league-matches__logo) {
    width: 40px;
    height: 40px;
  }
  .upcoming-match__group:first-child .match-divider {
    display: none;
  }
  .match-divider {
    margin-bottom: 20px;
  }
</style>
