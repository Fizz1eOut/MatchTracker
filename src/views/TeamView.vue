<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getTeamById } from '@/api/teams';
  import type { Team } from '@/interface/teams.interface';
  import TeamDetails from '@/components/Content/TeamDetails/TeamDetails.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const route = useRoute();
  const team = ref<Team | null>(null);
  const isLoading = ref(true);

  const fetchTeam = async (teamId: string) => {
    try {
      const response = await getTeamById(teamId);
      team.value = response;
      console.log('Loaded team:', team.value);
    } catch (error) {
      console.error('Error loading match data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        fetchTeam(newId as string);
      }
    }
  );

  onMounted(() => {
    fetchTeam(route.params.id as string);
  });
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading"
    size="60px"
    height="100vh"
  />
  <div v-else>
    <team-details :team="team" />
  </div>
</template>
