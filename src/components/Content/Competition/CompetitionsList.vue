<script setup lang="ts">
  import type { Competition } from '@/interface/сompetitions.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import CompetitionItem from '@/components/Content/Competition/CompetitionItem.vue';

  interface CompetetionListProps {
    competitions: Competition[];
  }
  const props = defineProps<CompetetionListProps>();
</script>

<template>
  <div class="competitions-list">
    <app-title>Competitions</app-title>

    <div class="competitions-list__items">
      <div 
        v-for="competition in props.competitions" 
        :key="competition.id"
        class="competitions-list__item"
      >
        <competition-item :competition="competition" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .competitions-list__items {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    row-gap: 30px;
    flex-wrap: wrap;
  }
  .competitions-list__item {
    flex: 0 1 200px;
    height: 250px;
  }
  .competitions-list__item {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .competitions-list__item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  .competitions-list__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
    transition: left 0.5s ease;
  }
  .competitions-list__item:hover::before {
    left: 100%;
  }
  @media (max-width: 768px) {
    .competitions-list__items {
      justify-content: space-around;
    }
    .competitions-list__item {
      height: 200px;
    }
  }
  @media (max-width: 442px) {
    .competitions-list__item {
      flex: 0 1 260px;
      height: 250px;
    }
  }
</style>  
