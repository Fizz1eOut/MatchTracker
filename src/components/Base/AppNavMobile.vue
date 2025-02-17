<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppLeaguesDropdown from '@/components/Base/AppLeaguesDropdown.vue';

  interface NavMobileProps {
    open: boolean;
  }

  defineProps<NavMobileProps>();

  // Эмиссия событий
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const close = () => {
    emit('close');
  };
</script>

<template>
  <Transition>
    <nav
      v-if="open" 
      class="nav-modile" 
    >
      <app-container>
        <div class="nav-mobile__body">
          <div class="nav-mobile__item">
            <router-link to="/" @click="close">
              <app-link class="nav-mobile__link">
                Home
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <app-leagues-dropdown />
          </div>

          <div class="nav-mobile__item">
            <router-link to="" @click="close">
              <app-link class="nav-mobile__link">
                Matches
              </app-link>
            </router-link>
          </div>
          
          <div class="nav-mobile__item">
            <router-link to="" @click="close">
              <app-link class="nav-mobile__link">
                Standings
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="" @click="close">
              <app-link class="nav-mobile__link">
                Scorers
              </app-link>
            </router-link>
          </div>
        </div>
      </app-container>
    </nav>
  </Transition>
</template>

<style scoped>
  .nav-mobile__row {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 164px;
  }
  .nav-mobile__row .nav-mobile__link {
    font-size: 20px;
  }
  .nav-mobile__link {
    pointer-events: none;
  }
  .router-link-active .nav-mobile__link {
    cursor: pointer;
    color: var(--color-light-blue);
  }

  @media (max-width: 768px) {
    .nav-modile {
      position: fixed;
      left: 0;
      top: 0px;
      max-width: 350px;
      width: 100%;
      height: 100vh;
      z-index: 9;
      box-shadow: 0px 0px 10px 1px rgb(0 0 0 / 25%);
      background-color: var(--color-underlay);
    }
    .nav-mobile__body {
      /* margin-top: 120px; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .nav-mobile__body >*:not(:last-child) {
      margin-bottom: 40px;
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.9s ease-in-out;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
  @media (max-width: 499px) {
    .nav-modile {
      max-width: 100%;
    }
  }
</style>
