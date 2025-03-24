<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { getCompetitionStandings } from '@/api/competitions';
  import type { Standings } from '@/interface/standings.interface';
  import type { Team } from '@/interface/teams.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import TeamLeagues from '@/components/Content/TeamDetails/TeamLeagues.vue';
  import StandingsTable from '@/components/Content/Standings/StandingsTable.vue';
  import TeamMatches from '@/components/Content/TeamDetails/TeamMatches.vue';

  interface TeamCompetitionsProps {
    team: Team;
  }
  const props = defineProps<TeamCompetitionsProps>();

  const selectedCompetition = ref<number | null>(null);
  const standings = ref<Standings | null>(null);
  const isLoading = ref(false);

  const fetchStandings = async (competitionId: number) => {
    isLoading.value = true;
    try {
      standings.value = await getCompetitionStandings(competitionId);
      console.log('Loaded standings:', standings.value);
    } catch (error) {
      console.error('Error loading table:', error);
      standings.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const handleCompetitionClick = (competitionId: number) => {
    if (selectedCompetition.value !== competitionId) {
      selectedCompetition.value = competitionId;
    }
  };

  watch(selectedCompetition, (newCompetitionId) => {
    if (newCompetitionId !== null) {
      fetchStandings(newCompetitionId);
    }
  });

  onMounted(() => {
    if (props.team?.runningCompetitions?.length > 0) {
      selectedCompetition.value = props.team.runningCompetitions[0].id;
    }
  });
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
    <div>
      <team-matches v-if="selectedCompetition !== null" :competition-id="selectedCompetition.toString()" />
    </div>
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
