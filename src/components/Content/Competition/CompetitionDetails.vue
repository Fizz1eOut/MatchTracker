<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import CompetitionCard from '@/components/Content/Competition/CompetitionCard.vue';
  import CompetitionTable from '@/components/Content/Competition/CompetitionTable.vue';
  import CompetitionMatches from '@/components/Content/Competition/CompetitionMatches.vue';
  import CompetitionScorers from '@/components/Content/Competition/CompetitionScorers.vue';
  import AppTabs from '@/components/Base/AppTabs.vue';

  interface CompetitionDetailsProps {
    competition: Competition;
  }
  defineProps<CompetitionDetailsProps>();
  
  const tabs = [
    { label: 'Tournament table', slotName: 'table' },
    { label: 'Tournament matches', slotName: 'matches' },
    { label: 'Top Scorers', slotName: 'scorers' },
  ];
</script>

<template>
  <div>
    <competition-card :competition="competition" />
    <app-tabs :tabs="tabs">
      <template #table>
        <competition-table :competition="competition" />
      </template>
      <template #matches>
        <competition-matches :competition="competition" />
      </template>
      <template #scorers>
        <competition-scorers :competition="competition" />
      </template>
    </app-tabs>
  </div>
</template>

<style scoped>

</style>

