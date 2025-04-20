<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getTopScorers } from '@/api/scorers';
  import type { Scorer } from '@/interface/scorers.interface';
  import type { Competition } from '@/interface/сompetitions.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import ScorersTable from '@/components/Content/Scorers/ScorersTable.vue';

  interface CompetitionScorersProps {
    competition: Competition;
  }
  const props = defineProps<CompetitionScorersProps>();

  const scorers = ref<Scorer[]>([]);
  const isLoading = ref(false);

  const fetchTopScorers = async (competitionId: string) => {
    isLoading.value = true;
    try {
      const response = await getTopScorers(competitionId);
      scorers.value = response.scorers;
      console.log('Loaded scorers:', scorers.value);
    } catch (error) {
      console.error('Error loading scorers', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchTopScorers(String(props.competition.id));
  });
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else>
    <scorers-table :scorers="scorers" />
  </div>
</template>

<style scoped>

</style>
