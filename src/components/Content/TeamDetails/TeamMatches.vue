<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMatches } from '@/api/matches';
  import type { Match, Team } from '@/interface/matches.interface';
  import MatchItem from '@/components/Content/MatchList/MatchItem.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import TeamLeagues from '@/components/Content/TeamDetails/TeamLeagues.vue';

  interface TeamMatchesProps {
    team: Team | null;
    selectedCompetition: number | null;
  }
  const props = defineProps<TeamMatchesProps>();
  const emit = defineEmits<{ (event: 'selectCompetition', competitionId: number): void }>();

  const handleCompetitionClick = (competitionId: number) => {
    emit('selectCompetition', competitionId);
  };

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

  watch(() => props.selectedCompetition, (newCompetitionId) => {
    if (newCompetitionId) {
      fetchMatches(newCompetitionId.toString());
    }
  }, { immediate: true });
</script>

<template>
  <app-loading-spinner
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else-if="teamMatches.length" class="team-matches">
    <app-title>Team matches</app-title>

    <team-leagues 
      v-if="team?.runningCompetitions?.length"
      :competition="team.runningCompetitions"
      :selectedCompetition="selectedCompetition"
      @select="handleCompetitionClick"
    />
    <ul class="team-matches__list">
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
  .team-matches {
    margin-top: 40px;
  }
  .team-matches__list {
    margin-top: 20px;
  }
</style>
