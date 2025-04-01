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
  .league {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .league:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .league::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
      transition: left 0.5s ease;
  }
  .league:hover::before {
      left: 100%;
  }
</style>
