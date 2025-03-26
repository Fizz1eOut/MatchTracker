<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { getCompetitionStandings } from '@/api/competitions';
  import type { Standings } from '@/interface/standings.interface';
  import type { Team } from '@/interface/teams.interface';
  import TeamProfile from '@/components/Content/TeamDetails/TeamProfile.vue';
  import TeamCompetitions from '@/components/Content/TeamDetails/TeamCompetitions.vue';
  import TeamPlayers from '@/components/Content/TeamDetails/TeamPlayers.vue';
  import TeamMatches from '@/components/Content/TeamDetails/TeamMatches.vue';
  import AppTabs from '@/components/Base/AppTabs.vue';

  interface TeamDetailsProps {
    team: Team | null;
  }
  const props = defineProps<TeamDetailsProps>();

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

  watch(selectedCompetition, (newCompetitionId) => {
    if (newCompetitionId !== null) {
      fetchStandings(newCompetitionId);
    }
  });

  const handleCompetitionClick = (competitionId: number) => {
    if (selectedCompetition.value !== competitionId) {
      selectedCompetition.value = competitionId;
    }
  };

  onMounted(() => {
    if (props.team?.runningCompetitions?.length) {
      selectedCompetition.value = props.team.runningCompetitions[0].id;
    }
  });

  const tabs = [
    { label: 'Tournament table', slotName: 'table' },
    { label: 'Team matches', slotName: 'matches' },
    { label: 'Squad', slotName: 'squad' },
  ];
</script>

<template>
  <div v-if="team" class="team-details">
    <team-profile :team="team" />
    
    <app-tabs :tabs="tabs">
      <template #table>
        <team-competitions
          :team="team"
          :selectedCompetition="selectedCompetition"
          :standings="standings"
          :isLoading="isLoading"
          @selectCompetition="handleCompetitionClick"
        />
      </template>

      <template #matches>
        <team-matches
          :team="team"
          :selectedCompetition="selectedCompetition"
          @selectCompetition="handleCompetitionClick"
        />
      </template>

      <template #squad>
        <team-players :team="team" />
      </template>
    </app-tabs>
  </div>
</template>

<style scoped>

</style>
