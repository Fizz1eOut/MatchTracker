<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import MatchCountdown from '@/components/Content/MatchList/MatchCountdown.vue';

  interface MatchCardProps {
    match: Match;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }

  defineProps<MatchCardProps>();
  const emit = defineEmits(['match-ended']);

  const onMatchEnded = () => {
    emit('match-ended');
  };
</script>

<template>
  <li class="upcoming-match__item match">
    <div class="match__content">
      <div class="match__item">
        <app-image :imageUrl="match.homeTeam.crest" :alt="match.homeTeam.name" class="logo" />
        <div class="match__team">{{ match.homeTeam.name }}</div>
      </div>

      <match-countdown :utcDate="match.utcDate" @match-ended="onMatchEnded" />

      <div class="match__item">
        <app-image :imageUrl="match.awayTeam.crest" :alt="match.awayTeam.name" class="logo" />
        <div class="match__team">{{ match.awayTeam.name }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
  .match__content {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .match__item {
    max-width: 200px;
  }
  .match__row {
  }
  .logo {
    width: 100%;
    height: 80px;
    object-fit: contain;
  }
  .match__team {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 400px;
    text-align: center;
  }
  .match__time {
  }
</style>
