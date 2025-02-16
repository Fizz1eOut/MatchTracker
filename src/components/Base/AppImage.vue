<script setup lang="ts">
  import { defineProps } from 'vue';

  interface AppImageCoinProps {
    imageUrl: string;
  }
  defineProps<AppImageCoinProps>();
</script>

<template>
  <img
    v-if="imageUrl"
    class="image"
    :src="imageUrl"
    alt="Image"
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
}
</style>
