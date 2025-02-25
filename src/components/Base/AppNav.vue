<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
  import AppLeaguesDropdown from '@/components/Base/AppLeaguesDropdown.vue';
</script>

<template>
  <div class="nav">
    <div class="nav__body">
      <div class="nav__item">
        <router-link to="/">
          <app-link>Home</app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <app-leagues-dropdown />
      </div>

      <div class="nav__item">
        <router-link to="">
          <app-link>Matches</app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="">
          <app-link>Standings</app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="">
          <app-link>Scorers</app-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .nav {
    max-width: 550px;
    width: 100%;
  }

  .nav__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .router-link-active .link {
    cursor: pointer;
    color: var(--color-white);
  }
</style>
