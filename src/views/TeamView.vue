<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getTeamById } from '@/api/teams';
  import type { Team } from '@/interface/teams.interface';

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

  onMounted(() => {
    fetchTeam(route.params.id as string);
  });
</script>

<template>
  <div v-if="team">
    <h1>{{ team.name }}</h1>
  </div>
</template>
