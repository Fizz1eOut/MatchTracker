<script setup lang="ts">
  import { ref, watch } from 'vue';

  interface AppImageCoinProps {
    imageUrl?: string;
  }
  const props = defineProps<AppImageCoinProps>();

  const hasError = ref(false);

  // Сбрасываем ошибку при изменении imageUrl
  watch(() => props.imageUrl, () => {
    hasError.value = false;
  });
</script>

<template>
  <img
    v-if="imageUrl && !hasError"
    class="image"
    :src="imageUrl"
    alt="Image"
    @error="hasError = true"
  >
  <img
    v-else
    class="image"
    src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
    alt="Image not available"
  >
</template>

<style scoped>
.image {
  width: 25px;
  height: 25px;
  border-radius: 10px;
}
</style>
