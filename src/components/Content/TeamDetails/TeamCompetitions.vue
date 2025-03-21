<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { getCompetitionStandings } from '@/api/competitions';
  import type { Standings } from '@/interface/standings.interface';
  import type { Competition } from '@/interface/teams.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import TeamCompetitionsItem from '@/components/Content/TeamDetails/TeamCompetitionsItem.vue';
  import StandingsTable from '@/components/Content/Standings/StandingsTable.vue';
  import TeamMatches from '@/components/Content/TeamDetails/TeamMatches.vue';

  interface TeamCompetitionsProps {
    competitions: Competition[];
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

  const handleCompetitionClick = (competition: Competition) => {
    if (selectedCompetition.value !== competition.id) {
      selectedCompetition.value = competition.id;
    }
  };

  watch(selectedCompetition, (newCompetitionId) => {
    if (newCompetitionId !== null) {
      fetchStandings(newCompetitionId);
    }
  });

  onMounted(() => {
    if (props.competitions.length > 0) {
      selectedCompetition.value = props.competitions[0].id;
    }
  });
</script>

<template>
  <div v-if="competitions.length" class="competitions">
    <app-title class="competitions__title">
      Tournament table
    </app-title>
    <app-underlay>
      <app-container size="sm">
        <div class="competitions__list">
          <team-competitions-item 
            v-for="competition in competitions"
            :key="competition.id"
            :competition="competition"
            :is-selected="competition.id === selectedCompetition"
            @click="handleCompetitionClick"
            class="competition__item" 
          />
        </div>
      </app-container>
    </app-underlay>

    <div v-if="selectedCompetition !== null">
      <standings-table
        :standings="standings" 
        :is-loading="isLoading"
      />
    </div>

    <team-matches v-if="selectedCompetition !== null" :competition-id="selectedCompetition.toString()" />
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
