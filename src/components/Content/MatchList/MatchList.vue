<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { getMatches } from '@/api/matches';
  import type { Match } from '@/interface/matches.interface';
  import AllMatches from '@/components/Content/MatchList/AllMatches.vue';
  import LiveMatches from '@/components/Content/MatchList/LiveMatches.vue';
  import NextMatch from '@/components/Content/MatchList/NextMatch.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const isLoading = ref(true);
  const matches = ref<Match[]>([]);
  let updateTimer: number | null = null;

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

  const todayMatches = computed(() => 
    groupMatchesByLeague(matches.value.filter(match => 
      ['SCHEDULED', 'TIMED', 'IN_PLAY', 'FINISHED'].includes(match.status)
    ))
  );

  const liveMatches = computed(() => groupMatchesByLeague(matches.value.filter(match => isOngoing(match))));

  const nextMatch = computed(() => {
    const now = new Date();
    const upcomingMatches = matches.value
      .filter((match) => new Date(match.utcDate) > now) // Только будущие матчи
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

    const match = upcomingMatches[0];
    return match
      ? {
        [match.competition.id]: {
          name: match.competition.name,
          emblem: match.competition.emblem,
          matches: [match],
        },
      }
      : {};
  });

  // Периодическое обновление nextMatch каждые 5 секунд
  const startNextMatchUpdate = () => {
    updateTimer = setInterval(() => {
    // Вызываем пересчёт nextMatch, Vue автоматически обновит computed
    }, 5000);
  };

  onMounted(() => {
    loadMatches();
    startNextMatchUpdate();
  });

  onUnmounted(() => {
    if (updateTimer !== null) clearInterval(updateTimer);
  });
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else>
    <div class="match-list">
      <div class="match-list__item all-match-list__all-matches">
        <all-matches :matchesByLeague="todayMatches" :formatMatchTime="formatMatchTime" :isOngoing="isOngoing" />
      </div>
      <div class="match-list__item">
        <live-matches :matchesByLeague="liveMatches" :formatMatchTime="formatMatchTime" :isOngoing="isOngoing" />
        <next-match 
          :matchesByLeague="nextMatch" 
          :formatMatchTime="formatMatchTime" 
          :isOngoing="isOngoing" 
          @match-ended="loadMatches"
        />
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
  @media (max-width: 868px) {
    .match-list {
      flex-direction: column;
    }
    .all-match-list__all-matches {
      order: 1;
    }
  }
</style>
