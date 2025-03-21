<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMatches } from '@/api/matches';
  import type { Match } from '@/interface/matches.interface';
  import MatchItem from '@/components/Content/MatchList/MatchItem.vue';

  interface TeamMatchesProps {
    competitionId: string;
  }
  const props = defineProps<TeamMatchesProps>();

  const route = useRoute();
  const matches = ref<Match[]>([]);
  const isLoading = ref(false);
  
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatMatchTime = (utcDate: string) => {
    const matchDate = new Date(utcDate);
    const now = new Date();

    const isToday = now.toDateString() === matchDate.toDateString();

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: userTimeZone,
    };

    if (isToday) {
      return new Intl.DateTimeFormat('ru-RU', options).format(matchDate);
    }

    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      timeZone: userTimeZone,
    }).format(matchDate);
  };

  const isOngoing = (match: Match) => {
    const now = new Date();
    const matchDate = new Date(match.utcDate);
    return matchDate <= now && match.status !== 'FINISHED';
  };

  const fetchMatches = async (competitionId: string) => {
    isLoading.value = true;
    try {
      matches.value = await getMatches(competitionId);
      console.log('Loaded matches:', matches.value);
    } catch (error) {
      console.error('Error loading matches', error);
    } finally {
      isLoading.value = false;
    }
  };

  const teamMatches = computed(() =>
    matches.value.filter(match => 
      match.homeTeam.id === Number(route.params.id) || 
      match.awayTeam.id === Number(route.params.id)
    )
      .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
  );

  watch(() => props.competitionId, (newCompetitionId) => {
    if (newCompetitionId) {
      fetchMatches(newCompetitionId);
    }
  }, { immediate: true });
</script>

<template>
  <div class="team-matches">
    <h2>Матчи команды</h2>
    
    <div v-if="isLoading">Загрузка...</div>
    
    <ul v-else-if="teamMatches.length">
      <match-item 
        v-for="match in teamMatches" 
        :key="match.id"
        :match="match"
        :formatMatchTime="formatMatchTime" 
        :isOngoing="isOngoing" 
      />
    </ul>
  </div>
</template>

<style scoped>

</style>
