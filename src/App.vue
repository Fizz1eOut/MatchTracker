<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppContainer from '@/components/Base/AppContainer.vue';
</script>

<template>
  <header>

  </header>

  <main>
    <app-container>
      <router-view />
    </app-container>
  </main>

  <footer>

  </footer>
</template>

<style scoped>

</style>
