<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppNav from '@/components/Base/AppNav.vue';
  // import AppNavMobile from '@/components/Base/AppNavMobile.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';
  import UserTime from '@/components/Base/UserTime.vue';

  const { isMobile } = useMediaQuery('(max-width: 768px)');
</script>
<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <div class="header__wrapper">
          <div class="header__img">
            <router-link to="/">
              <app-icon 
                name="logo" 
                class="logo"
              />
            </router-link>
          </div>
          <app-nav v-if="!isMobile" class="nav" />
          <!-- <app-nav-mobile v-if="isMobile" class="nav-mobile" /> -->
        </div>
        <user-time />
      </div>
    </app-container>
  </div>
</template>

<style scoped>
.header__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 400px;
    width: 100%;
  }
  @media (max-width: 768px) {
    .header__wrapper {
      max-width: 100%;
    }
  }
</style>
