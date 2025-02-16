<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(userTimeZone);
  const currentTime = ref('');

  const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString([], { timeZone: userTimeZone });
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
    <div class="timezone">Timezone:{{ userTimeZone }}</div>
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<style scoped>
  .time-container {
    text-align: center;
    font-family: "Roboto Condensed", serif;
  }
  .timezone {
    font-size: 14px;
    font-weight: 400;
  }
  .time {
    margin-top: 6px;
    font-size: 16px;
    font-weight: 400;

  }
  </style>
