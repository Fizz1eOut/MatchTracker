<script setup lang="ts">
  import type { Team } from '@/interface/teams.interface';
  import type { Standings } from '@/interface/standings.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
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
    <app-underlay>
      <app-container size="sm">
        <div class="competitions__list">
          <team-leagues 
            :competition="team.runningCompetitions"
            :selectedCompetition="selectedCompetition"
            @select="handleCompetitionClick"
            class="competition__item" 
          />
        </div>
      </app-container>
    </app-underlay>

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
  @media (max-width: 600px) {
    .competitions__list {
      overflow-x: auto;
      white-space: nowrap;
    }
    .competition__item {
      flex-shrink: 0;
      min-width: 150px;
    }
  }
</style>
