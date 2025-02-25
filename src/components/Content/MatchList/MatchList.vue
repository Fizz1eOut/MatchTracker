<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { getMatches } from '@/api/matches';
  import type { Match } from '@/interface/matches.interface';
  import AllMatches from '@/components/Content/MatchList/AllMatches.vue';
  import LiveMatches from '@/components/Content/MatchList/LiveMatches.vue';
  import NextMatch from '@/components/Content/MatchList/NextMatch.vue';
  import FinishedMatches from '@/components/Content/MatchList/FinishedMatches.vue';

  const isLoading = ref(true);
  const matches = ref<Match[]>([]);

  const loadMatches = async () => {
    try {
      matches.value = await getMatches();
      console.log('Loaded matches:', matches.value);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      isLoading.value = false;
    }
  };

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

  // группировка матчей по лигам
  const groupMatchesByLeague = (matches: Match[]) => {
    return matches.reduce((acc, match) => {
      const leagueId = match.competition.id;
      if (!acc[leagueId]) {
        acc[leagueId] = { 
          name: match.competition.name, 
          emblem: match.competition.emblem, 
          matches: [] 
        };
      }
      acc[leagueId].matches.push(match);
      return acc;
    }, {} as Record<number, { name: string; emblem: string; matches: Match[] }>);
  };

  // вычисляемые свойства с уже сгруппированными матчами
  const finishedMatches = computed(() => groupMatchesByLeague(matches.value.filter(match => match.status === 'FINISHED')));
  const todayMatches = computed(() => groupMatchesByLeague(matches.value.filter(match => ['SCHEDULED', 'TIMED', 'IN_PLAY'].includes(match.status))));
  const liveMatches = computed(() => groupMatchesByLeague(matches.value.filter(match => isOngoing(match))));
  const nextMatch = computed(() => {
    const match = matches.value.find(match => !isOngoing(match));
    return match ? { [match.competition.id]: { name: match.competition.name, emblem: match.competition.emblem, matches: [match] } } : {};
  });

  onMounted(loadMatches);
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <div class="match-list">
      <div class="match-list__item">
        <all-matches :matchesByLeague="todayMatches" :formatMatchTime="formatMatchTime" :isOngoing="isOngoing" />
        <finished-matches :matchesByLeague="finishedMatches" />
      </div>
      <div class="match-list__item">
        <live-matches :matchesByLeague="liveMatches" :formatMatchTime="formatMatchTime" :isOngoing="isOngoing" />
        <next-match :matchesByLeague="nextMatch" :formatMatchTime="formatMatchTime" :isOngoing="isOngoing" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .match-list {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .match-list__item {
    flex:  0 1 50%;
  }
</style>
