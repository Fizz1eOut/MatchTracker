<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import MatchCountdown from '@/components/Content/MatchList/MatchCountdown.vue';

  interface MatchCardProps {
    match: Match;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
    displayMode: 'countdown' | 'score';
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

      <div class="match__center">
        <match-countdown 
          v-if="displayMode === 'countdown'" 
          :utcDate="match.utcDate" 
          @match-ended="onMatchEnded" 
        />

        <div v-if="displayMode === 'score'">
          <div v-if="isOngoing(match)" class="match__status">Live</div>

          <div v-if="isOngoing(match) || match.status === 'FINISHED'" class="match__score">
            <span>{{ match.score.fullTime.home ?? "0" }}</span> - 
            <span>{{ match.score.fullTime.away ?? "0" }}</span>

            <div v-if="match.score.penalties?.home !== undefined">
              ({{ match.score.penalties.home }} - {{ match.score.penalties.away }})
            </div>
          </div>
        </div>
      </div>

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
    flex: 0 1 50%;
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
  .match__center {
    display: flex;
    justify-content: center;
    width: 100px;
    text-align: center;
  }

  .match__status {
    color: red;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .match__score {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
</style>
