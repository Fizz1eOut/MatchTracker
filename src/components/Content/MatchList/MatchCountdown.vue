<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  interface MatchCountdownProps {
    utcDate: string;
  }
  const props = defineProps<MatchCountdownProps>();
  const emit = defineEmits(['match-ended']);

  const timeLeft = ref<string>('00:00:00');
  const prevTime = ref<string>('00:00:00');
  const timer = ref<number | null>(null);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const matchTime = new Date(props.utcDate).getTime();
    const diff = matchTime - now;

    if (diff <= 0) {
      timeLeft.value = '00:00:00';
      if (timer.value !== null) clearInterval(timer.value);
      emit('match-ended');
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    prevTime.value = timeLeft.value;
    timeLeft.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  onMounted(() => {
    updateCountdown();
    timer.value = setInterval(updateCountdown, 1000);
  });

  onUnmounted(() => {
    if (timer.value !== null) clearInterval(timer.value);
  });
</script>

<template>
  <div class="countdown-container">
    <div class="countdown">
      <span
        v-for="(char, index) in timeLeft"
        :key="index"
        class="countdown-char"
        :class="{ flip: char !== prevTime[index] }"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<style scoped>
  .countdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 120px;
    width: 100%;
  }
  .countdown {
    font-size: 18px;
    font-weight: 400;
    display: flex;
  }
  .countdown-char {
    display: inline-block;
    transition: transform 0.5s ease-in-out;
  }
  .flip {
    animation: flip 0.6s ease-in-out;
  }
  @keyframes flip {
    0% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(-90deg);
      opacity: 0.5;
    }
    100% {
      transform: rotateX(0deg);
      opacity: 1;
    }
  }
  @media (max-width: 480px) {
    .countdown {
      font-size: 16px;
    }
  }  
</style>

