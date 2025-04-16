<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getCompetitionStandings } from '@/api/standings';
  import type { Standings } from '@/interface/standings.interface';
  import type { Competition } from '@/interface/сompetitions.interface';
  import StandingsTable from '@/components/Content/Standings/StandingsTable.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface CompetitionTableProps {
    competition: Competition;
  }
  const props = defineProps<CompetitionTableProps>();

  const standings = ref<Standings | null>(null);
  const isLoading = ref(false);

  const fetchStandings = async (competitionId: number) => {
    isLoading.value = true;
    try {
      standings.value = await getCompetitionStandings(competitionId);
      console.log('Loaded standings:', standings.value);
    } catch (error) {
      console.error('Error loading table:', error);
      standings.value = null;
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(() => {
    fetchStandings(props.competition.id);
  });
</script>

<template>
  <div class="competition-table">
    <app-title class="competition-table__title">Tournament table</app-title>
    <standings-table
      :standings="standings" 
      :is-loading="isLoading"
    />
  </div>
</template>

<style scoped>
  .competition-table {
    margin-top: 40px;
  }
  .competition-table__title {
    margin-bottom: 20px;
  }
</style>
