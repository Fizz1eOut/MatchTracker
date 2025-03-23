<script setup lang="ts">
  import type { Team } from '@/interface/teams.interface';
  import TeamProfile from '@/components/Content/TeamDetails/TeamProfile.vue';
  import TeamCompetitions from '@/components/Content/TeamDetails/TeamCompetitions.vue';

  interface TeamDetailsProps {
    team: Team | null;
  }
  defineProps<TeamDetailsProps>();
</script>

<template>
  <div v-if="team" class="team-details">
    <team-profile :team="team" />
    <team-competitions :team="team" />
  </div>
</template>

<style scoped>

</style>
