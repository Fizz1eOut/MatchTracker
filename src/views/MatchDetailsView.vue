<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import type { Match } from '@/interface/matches.interface';
  import { getMatchDetails } from '@/api/matchDetails';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const route = useRoute();
  const matchDetails = ref<Match | null>(null);
  const isLoading = ref(true);

  const fetchMatchDetails = async (matchId: string) => {
    try {
      matchDetails.value = await getMatchDetails(matchId);
      console.log('Match details:', matchDetails.value);
    } catch (error) {
      console.error('Error loading match data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchMatchDetails(route.params.matchId as string);
  });

  watch(
    () => route.params.matchId,
    (newMatchId) => {
      if (newMatchId) {
        fetchMatchDetails(newMatchId as string);
      }
    }
  );
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else>
    <h1>Match Details</h1>
  </div>
</template>
