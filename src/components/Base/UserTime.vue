<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const currentTime = ref('');

  const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  let interval: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (interval) clearInterval(interval);
  });
</script>

<template>
  <div class="time-container">
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<style scoped>
  .time-container {
    text-align: center;
    font-family: "Roboto", serif;
  }
  .time {
    font-size: 16px;
    font-weight: 400;
  }
</style>

