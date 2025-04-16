<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import CompetitionCard from '@/components/Content/Competition/CompetitionCard.vue';
  import CompetitionTable from '@/components/Content/Competition/CompetitionTable.vue';
  import CompetitionMatches from '@/components/Content/Competition/CompetitionMatches.vue';

  interface CompetitionDetailsProps {
    competition: Competition;
  }
  defineProps<CompetitionDetailsProps>();
  
</script>

<template>
  <competition-card :competition="competition" />
  <competition-table :competition="competition" />
  
  <competition-matches :competition="competition" />
</template>

<style scoped>

</style>
