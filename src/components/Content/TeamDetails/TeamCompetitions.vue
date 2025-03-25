<script setup lang="ts">
  import type { Team } from '@/interface/teams.interface';
  import type { Standings } from '@/interface/standings.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import TeamLeagues from '@/components/Content/TeamDetails/TeamLeagues.vue';
  import StandingsTable from '@/components/Content/Standings/StandingsTable.vue';

  interface TeamCompetitionsProps {
    team: Team;
    selectedCompetition: number | null;
    standings: Standings | null;
    isLoading: boolean;
  }
  defineProps<TeamCompetitionsProps>();

  const emit = defineEmits<{ (event: 'selectCompetition', competitionId: number): void }>();

  const handleCompetitionClick = (competitionId: number) => {
    emit('selectCompetition', competitionId);
  };
</script>

<template>
  <div v-if="team?.runningCompetitions?.length" class="competitions">
    <app-title class="competitions__title">
      Tournament table
    </app-title>
    <div class="competitions__list">
      <team-leagues 
        :competition="team.runningCompetitions"
        :selectedCompetition="selectedCompetition"
        @select="handleCompetitionClick"
        class="competition__item" 
      />
    </div>

    <standings-table
      v-if="selectedCompetition !== null"
      :standings="standings" 
      :is-loading="isLoading"
    />
  </div>
</template>

<style scoped>
  .competitions {
    margin-top: 40px;
  }
  .competitions__title {
    margin-bottom: 30px;
  }
  .competitions__list {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .competition__item {
    flex: 0 1 auto;
  }
</style>
