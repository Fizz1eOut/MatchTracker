<script setup lang="ts">
  import LeagueMatches from '@/components/Content/MatchList/LeagueMatches.vue';
  import type { Match } from '@/interface/matches.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface AllMatchesProps {
    matchesByLeague: Record<number, { name: string; emblem: string; matches: Match[] }>;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<AllMatchesProps>();
</script>

<template>
  <div v-if="Object.keys(matchesByLeague).length > 0">
    <app-title class="all-match__title">Upcoming Matches Today</app-title>
    <league-matches 
      v-for="(league, leagueId) in matchesByLeague" 
      :key="leagueId" 
      :league="league" 
      :formatMatchTime="formatMatchTime" 
      :isOngoing="isOngoing" 
    />
  </div>
</template>

<style scoped>
  .all-match__title {
    margin-bottom: 30px;
  }
</style>
