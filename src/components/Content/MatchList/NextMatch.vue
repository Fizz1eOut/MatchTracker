<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import LeagueHeader from '@/components/Content/MatchList/LeagueHeader.vue';
  import AppMatchCard from '@/components/Base/AppMatchCard.vue';

  interface NextMatchProps {
    matchesByLeague: Record<number, { name: string; emblem: string; matches: Match[] }>;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<NextMatchProps>();
  const emit = defineEmits(['match-ended']);

  const onMatchEnded = () => {
    emit('match-ended');
  };
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
            <league-header 
              :name="league.name" 
              :emblem="league.emblem" 
              :country="league.matches[0].area.name" 
            />
            <ul class="upcoming-match__items">
              <li v-for="match in league.matches" :key="match.id">
                <router-link :to="`/match/${match.id}`">
                  <app-match-card
                    :match="match"
                    :formatMatchTime="formatMatchTime"
                    :isOngoing="isOngoing"
                    @match-ended="onMatchEnded"
                    displayMode="countdown"
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
</style>
