<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppImage from '@/components/Base/AppImage.vue';

  interface MatchItemProps {
    match: Match;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<MatchItemProps>();
</script>

<template>
  <li class="match-item">
    <div class="match-item__info">
      <div v-if="isOngoing(match)" class="match__status">
        Live
      </div>
      <div v-else class="match__time">
        {{ formatMatchTime(match.utcDate) }}
      </div>
    </div>
    <div class="match">
      <div class="match__item">
        <div class="match__row">
          <app-image 
            :imageUrl="match.homeTeam.crest" 
            :alt="match.homeTeam.name" 
            class="logo"
          />
          <div class="match__team">{{ match.homeTeam.name }}</div>
        </div> 
        <div v-if="isOngoing(match)">
          {{ match.score.fullTime.home ?? 0 }}
        </div>
      </div>
    
      <div class="match__item">
        <div class="match__row">
          <app-image 
            :imageUrl="match.awayTeam.crest" 
            :alt="match.homeTeam.name" 
            class="logo"
          />
          <div class="match__team">{{ match.awayTeam.name }}</div>
        </div>
        <div v-if="isOngoing(match)">
          {{ match.score.fullTime.away ?? 0 }}
        </div> 
      </div>
    </div>
  </li>
</template>

<style scoped>
  .match-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out;
  }
  .match-item:hover {
    cursor: pointer;
    background-color: var(--color-secondary-underlay);
  }
  .match__status {
    font-size: 18px;
    font-weight: 400;
    color: rgb(211 46 46);
  }
  .match {
    width: 100%;
  }
  .match > *:not(:first-child) {
    margin-top: 10px;
  }
  .match__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .match__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
