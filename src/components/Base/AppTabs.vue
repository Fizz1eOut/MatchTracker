<script setup lang="ts">
  import { ref } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface Tab {
    label: string;
    slotName: string;
  }
  defineProps<{ tabs: Tab[] }>();

  const activeTab = ref(0);

  const selectTab = (index: number) => {
    activeTab.value = index;
  };
</script>

<template>
  <div class="tabs">
    <div class="tab__headers">
      <app-button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: index === activeTab }"
        class="tab__button"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </app-button>
    </div>
    <div class="tab__content">
      <Transition name="fade" mode="out-in">
        <div :key="tabs[activeTab]?.slotName">
          <slot :name="tabs[activeTab]?.slotName"></slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .tabs {
    margin-top: 40px;
  }
  .tab__headers {
    display: flex;
    align-items: start;
    gap: 10px;
  }
  .tab__button {
    max-width: 180px;
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    padding-bottom: 20px;
  }
  .tab__button:hover {
    color: var(--color-yellow);
  }
  .tab__button.active {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-yellow);
    color: var(--color-yellow);
  }
  .tab__content {
  }
  /* Анимация */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  @media (max-width: 600px) {
    .tab__headers {
      overflow-x: auto;
      white-space: nowrap;
    }
    .tab__button {
      flex-shrink: 0;
      min-width: 180px;
    }
  }
</style>
