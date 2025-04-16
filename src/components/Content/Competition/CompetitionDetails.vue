<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import CompetitionCard from '@/components/Content/Competition/CompetitionCard.vue';

  interface CompetitionDetailsProps {
    competition: Competition;
  }
  defineProps<CompetitionDetailsProps>();
  
</script>

<template>
  <competition-card :competition="competition" />
</template>

<style scoped>

</style>
