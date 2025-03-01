<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  interface MatchCountdownProps {
    utcDate: string;
  }
  const props = defineProps<MatchCountdownProps>();
  const emit = defineEmits(['match-ended']);
    
  const timeLeft = ref<string>('');
  const timer = ref< number | null> (null);

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
  <div class="countdown">
    {{ timeLeft }}
  </div>
</template>
