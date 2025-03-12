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
  // Эмит события при клике
  const emit = defineEmits<{
    (event: 'click', competition: Competition): void;
  }>();

  const handleClick = () => {
    emit('click', props.competition);
  };
</script>

<template>
  <app-underlay class="competition__underlay">
    <app-container>
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
    transition: background-color 0.3s, color 0.3s, filter 0.3s;
  }
  .competition__name {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-gray);
  }
  .competition__emblem {
    background-color: var(--color-white);
    width: 30px;
    height: 30px;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: filter 0.3s, opacity 0.3s;
  }
  .competition__row.selected .competition__name {
    color: var(--color-white);
  }

  .competition__row.selected .competition__emblem {
    filter: grayscale(0);
    opacity: 1;
  }
</style>
