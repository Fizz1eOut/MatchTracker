<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { Competition } from '@/interface/сompetitions.interface';
  import { getCompetitions} from '@/api/competitions';
  import CompetitionsList from '@/components/Content/Competition/CompetitionsList.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const isLoading = ref(true);
  const competitions = ref<Competition[] | null>(null);

  const fetchStandings = async () => {
    isLoading.value = true;
    try {
      const response = await getCompetitions();
      competitions.value = response.competitions;
      console.log('Loaded competitions:', competitions.value);
    } catch (error) {
      console.error('Error loading table:', error);
      competitions.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchStandings();
  });
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else>
    <competitions-list v-if="competitions" :competitions="competitions" />
  </div>
</template>

<style scoped>
</style>
