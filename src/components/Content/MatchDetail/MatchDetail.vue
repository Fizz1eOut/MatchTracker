<script setup lang="ts">
  import { computed } from 'vue';
  import type { Match } from '@/interface/matches.interface';
  import AppMatchCard from '@/components/Base/AppMatchCard.vue';

  interface MatchDetailProps {
    matchDetails: Match | null;
  }
  const props = defineProps<MatchDetailProps>();

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatMatchTime = (utcDate: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: userTimeZone
    }).format(new Date(utcDate));
  };

  const isOngoing = (match: Match) => {
    const now = new Date();
    const matchDate = new Date(match.utcDate);
    return matchDate <= now && match.status !== 'FINISHED';
  };

  const displayMode = computed(() => {
    if (!props.matchDetails?.utcDate) return 'countdown';
    return isOngoing(props.matchDetails) || props.matchDetails.status === 'FINISHED' ? 'score' : 'countdown';
  });
</script>

<template>
  <div class="match-detail">
    <app-match-card
      v-if="matchDetails"
      :match="matchDetails"
      :formatMatchTime="formatMatchTime"
      :isOngoing="isOngoing"
      :displayMode="displayMode"
    />
  </div>
</template>

<style>
.match-detail {
  position: relative;
  background-image: url('../../../assets/img/MatchBackground.webp');
  background-position: center;
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
}

.match-detail::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.match-detail > * {
  position: relative;
  z-index: 1;
}
</style>
