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
  <div class="live-matches" v-if="Object.keys(matchesByLeague).length > 0">
    <app-title class="live-matches__title">Live Matches</app-title>
    <app-underlay>
      <app-container size="sm">
        <div class="live-matches__list">
          <div 
            v-for="(league, leagueId) in matchesByLeague"
            :key="leagueId" 
            class="live-matches__group"
          >
            <app-divider class="match-divider" />

            <league-header 
              :name="league.name" 
              :emblem="league.emblem" 
              :country="league.matches[0].area.name" 
            />
            <ul class="live-matches__items">
              <li v-for="match in league.matches" :key="match.id">
                <router-link :to="`/match/${match.id}`">
                  <app-match-card
                    v-for="match in league.matches"
                    :key="match.id"
                    :match="match"
                    :formatMatchTime="formatMatchTime"
                    :isOngoing="isOngoing"
                    displayMode="score"
                  />
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .live-matches {
    margin-bottom: 30px;
  }
  .live-matches__title {
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
  .live-matches__group:first-child .match-divider {
    display: none;
  }
  .match-divider {
    margin-bottom: 20px;
  }
</style>
