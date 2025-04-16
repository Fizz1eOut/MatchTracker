<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getMatches } from '@/api/matches';
  import type { Match } from '@/interface/matches.interface';
  import type { Competition } from '@/interface/сompetitions.interface';
  import MatchItem from '@/components/Content/MatchList/MatchItem.vue';
  import AppTabs from '@/components/Base/AppTabs.vue';

  interface CompetitionMatchesProps {
    competition: Competition;
  }
  const props = defineProps<CompetitionMatchesProps>();

  const matches = ref<Match[]>([]);
  const isLoading = ref(false);

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

  onMounted(() => {
    fetchMatches(String(props.competition.id));
  });

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

  const finished = computed(() => {
    return matches.value.filter((match) => match.status === 'FINISHED');
  });

  const upcoming = computed(() => {
    return matches.value.filter((match) => match.status !== 'FINISHED');
  });

  const tabs = [
    { label: 'Finished matches', slotName: 'finished' },
    { label: 'Upcoming matches', slotName: 'upcoming' },
  ];
</script>

<template>
  <div>
    <app-tabs :tabs="tabs">
      <template #finished>
        <MatchItem
          v-for="match in finished"
          :key="match.id"
          :match="match"
          :formatMatchTime="formatMatchTime"
          :isOngoing="isOngoing"
        />
      </template>

      <template #upcoming>
        <MatchItem
          v-for="match in upcoming"
          :key="match.id"
          :match="match"
          :formatMatchTime="formatMatchTime"
          :isOngoing="isOngoing"
        />
      </template>
    </app-tabs>
  </div>
</template>

<style scoped>
  :deep(.tab__headers) {
    margin-bottom: 20px;
  }
</style>
