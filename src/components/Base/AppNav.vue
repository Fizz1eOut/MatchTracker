<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getLeagues } from '@/api/leagues';
  import type { League }  from '@/api/leagues';
  import AppLink from '@/components/Base/AppLink.vue';
  import AppDropdown from '@/components/Base/AppDropdown.vue';
  import AppDropdownItem from '@/components/Base/AppDropdownItem.vue';
  import AppImage from '@/components/Base/AppImage.vue';

  const leagues = ref<League[]>([]);
  const isDropdownOpen = ref(false);

  const fetchLeagues = async () => {
    try {
      leagues.value = await getLeagues();
      console.log('Leagues loaded:', leagues.value);
    } catch (error) {
      console.error('Error loading leagues:', error);
    }
  };

  onMounted(fetchLeagues);

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const handleLeagueClick = (leagueName: string) => {
    console.log(`League selected: ${leagueName}`);
  };
</script>

<template>
  <div class="nav">
    <div class="nav__body">
      <div class="nav__item dropdown-container" @click="toggleDropdown">
        <app-link>
          Competitions
        </app-link>
        <app-dropdown :active="isDropdownOpen" class="dropdown__body">
          <app-dropdown-item 
            v-for="league in leagues" 
            :key="league.id" 
            @click="handleLeagueClick(league.name)"
            class="dropdown__body__item"
          >
            <app-image :imageUrl="league.emblem" class="league-icon" />
            {{ league.name }}
          </app-dropdown-item>
        </app-dropdown>
      </div>

      <div class="nav__item">
        <router-link to="">
          <app-link>Teams</app-link>
        </router-link>
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

<style>
  .dropdown__body__item .item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
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
    color: var(--color-light-blue);
  }

  .dropdown-container {
    position: relative;
    cursor: pointer;
  }
  .dropdown__body {
    height: 250px;
    overflow: auto;
  }
  .league-icon {
    background-color: var(--color-white);
    border-radius: 2px;
  }
</style>
