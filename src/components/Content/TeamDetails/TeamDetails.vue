<script setup lang="ts">
  import type { Team } from '@/interface/teams.interface';
  import TeamProfile from '@/components/Content/TeamDetails/TeamProfile.vue';

  interface TeamDetailsProps {
    team: Team | null;
  }
  defineProps<TeamDetailsProps>();
</script>

<template>
  <div class="team-details">
    <team-profile :team="team" />
  </div>
</template>

<style scoped>

</style>
