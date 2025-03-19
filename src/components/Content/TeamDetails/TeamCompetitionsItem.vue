<script setup lang="ts">
  import type { Competition } from '@/interface/teams.interface';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppImage from '@/components/Base/AppImage.vue';

  interface TeamCompetitionsItemProps {
    competition: Competition;
    isSelected: boolean;
  }
  const props = defineProps<TeamCompetitionsItemProps>();

  const emit = defineEmits<{
    (event: 'click', competition: Competition): void;
  }>();

  const handleClick = () => {
    emit('click', props.competition);
  };
</script>

<template>
  <app-underlay class="competition__underlay">
    <app-container class="competition__container">
      <app-button 
        class="competition__row" 
        @click="handleClick"
        :class="{ 'selected': isSelected }"
      >
        <app-image :imageUrl="competition.emblem || ''" class="competition__emblem" />
        <div class="competition__name">
          {{ competition.name }}
        </div>
      </app-button>
    </app-container>
  </app-underlay>
</template>

<style scoped>
  .competition__underlay {
    background-color: var(--color-secondary-underlay);
  }
  .competition__row {
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, filter 0.3s ease-in-out;
  }
  .competition__row.selected .competition__name {
    color: var(--color-white);
  }
  .competition__row.selected .competition__emblem {
    filter: grayscale(0);
    opacity: 1;
  }
  .competition__name {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-gray);
    transition: color 0.3s ease-in-out;
  }
  .competition__row:hover .competition__name {
    color: var(--color-white);
  }
  .competition__emblem {
    background-color: var(--color-white);
    filter: grayscale(100%);
    opacity: 0.6;
    transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .competition__row:hover .competition__emblem {
    filter: grayscale(0);
    opacity: 1;
  }
  @media (max-width: 600px) {
    .competition__container {
      padding: 10px;
    }
    .competition__name {
      font-size: 14px;
    }
  }
</style>
