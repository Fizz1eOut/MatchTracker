<script setup lang="ts">
  import { computed } from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface LoadingSpinnerProps {
    size?: string;
    borderWidth?: string;
    height?: string;
  }
  const props = defineProps<LoadingSpinnerProps>();

  const containerStyle = computed(() => ({
    height: props.height
  }));

  const spinnerStyle = computed(() => ({
    width: props.size,
    height: props.size,
    borderWidth: props.borderWidth,
  }));
</script>

<template>
  <div class="loader" :style="containerStyle">
    <div class="spinner" :style="spinnerStyle">
      <app-icon name="ball" size="50px" class="football-icon" />
    </div>
  </div>
</template>

<style scoped>
@keyframes footballBounceWall {
  0% {
    left: 0; /* Начало у левого края */
    transform: translateY(0) rotate(0deg);
  }
  20% {
    left: calc(15% - var(--size) / 2); /* Плавное движение вправо */
    transform: translateY(-65px) rotate(72deg); /* Первый прыжок */
  }
  40% {
    left: calc(40% - var(--size) / 2); /* Центр */
    transform: translateY(0) rotate(144deg);
  }
  60% {
    left: calc(75% - var(--size) / 2); /* Ближе к правому краю */
    transform: translateY(-80px) rotate(216deg); /* Второй прыжок */
  }
  80% {
    left: calc(100% - var(--size)); /* Правый край */
    transform: translateY(0) rotate(288deg);
  }
  100% {
    left: 0; /* Возврат к левому краю */
    transform: translateY(0) rotate(360deg);
  }
}

.loader {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.spinner {
  --size: v-bind(size);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: footballBounceWall 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.football-icon {
  color: var(--color-dark);
  background-color: var(--color-white);
  border-radius: 50%;
}
</style>
