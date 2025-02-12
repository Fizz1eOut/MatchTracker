<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppHeader from '@/components/Base/AppHeader.vue';
</script>

<template>
  <app-header />

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
