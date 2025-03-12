<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { Competition } from '@/interface/teams.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import TeamCompetitionsItem from '@/components/Content/TeamDetails/TeamCompetitionsItem.vue';

  interface TeamCompetitionsProps {
    competitions: Competition[];
  }
  const props = defineProps<TeamCompetitionsProps>();

  const selectedCompetition = ref<number | null>(null);

  const handleCompetitionClick = (competition: Competition) => {
    selectedCompetition.value = competition.id;
    console.log('Selected competition:', competition);
  };

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
