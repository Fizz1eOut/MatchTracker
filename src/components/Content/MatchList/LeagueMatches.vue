<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import MatchItem from '@/components/Content/MatchList/MatchItem.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import LeagueHeader from '@/components/Content/MatchList/LeagueHeader.vue';

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
          <league-header 
            :name="league.name" 
            :emblem="league.emblem" 
            :country="league.matches[0].area.name" 
          />
          <ul class="league-matches__list">
            <match-item 
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
  .league-matches__list > *:not(:last-child) {
    margin-bottom: 20px;
  }
</style>
