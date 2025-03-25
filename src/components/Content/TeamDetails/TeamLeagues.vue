<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Competition } from '@/interface/matches.interface';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';

  interface TeamLeaguesProps {
    competition: Competition[];
    selectedCompetition: number | null;
  }
  const props = defineProps<TeamLeaguesProps>();
  const emit = defineEmits<{
    (event: 'select', competitionId: number): void;
  }>();

  const selectedCompetition = ref<number | null>(props.selectedCompetition);

  watch(() => props.selectedCompetition, (newVal) => {
    selectedCompetition.value = newVal;
  });

  const handleCompetitionClick = (competitionId: number) => {
    selectedCompetition.value = competitionId;
    emit('select', competitionId);
  };
</script>

<template>
  <div class="team-leagues">
    <app-subtitle class="team-leagues__subtitle">
      List of available leagues
    </app-subtitle>
    <app-underlay>
      <app-container size="sm" class="team-leagues__container">
        <ul class="team-leagues__list">
          <li
            v-for="comp in competition"
            :key="comp.id"
            class="team-leagues__item"
          >
            <app-underlay class="team-leagues__underlay">
              <app-container class="team-leagues__container">
                <app-button 
                  class="team-leagues__row"
                  @click="handleCompetitionClick(comp.id)"
                  :class="{ 'selected': comp.id === selectedCompetition }"
                >
                  <app-image :imageUrl="comp.emblem || ''" class="team-leagues__emblem" />
                  <div class="team-leagues__name">
                    {{ comp.name }}
                  </div>
                </app-button>
              </app-container>
            </app-underlay>
          </li>
        </ul>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .team-leagues {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    margin-bottom: 20px;
  }
  .team-leagues__subtitle {
    margin-bottom: 10px;
  }
  .team-leagues__underlay {
    background-color: var(--color-secondary-underlay);
  }
  .team-leagues__list {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .team-leagues__row {
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, filter 0.3s ease-in-out;
  }
  .team-leagues__row.selected .team-leagues__name {
    color: var(--color-white);
  }
  .team-leagues__row.selected .team-leagues__emblem {
    filter: grayscale(0);
    opacity: 1;
  }
  .team-leagues__name {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-gray);
    transition: color 0.3s ease-in-out;
  }
  .team-leagues__row:hover .team-leagues__name {
    color: var(--color-white);
  }
  .team-leagues__emblem {
    background-color: var(--color-white);
    filter: grayscale(100%);
    opacity: 0.6;
    transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .team-leagues__row:hover .team-leagues__emblem {
    filter: grayscale(0);
    opacity: 1;
  }
  @media (max-width: 600px) {
    .team-leagues__container {
      padding: 10px;
    }
    .team-leagues__name {
      font-size: 14px;
    }
  }

  @media (max-width: 600px) {
    .team-leagues__list {
      overflow-x: auto;
      white-space: nowrap;
    }
    .team-leagues__item {
      flex-shrink: 0;
      min-width: 150px;
    }
  }
</style>
