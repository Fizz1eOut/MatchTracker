<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getLeagues } from '@/api/leagues';
  import type { League } from '@/api/leagues';
  import AppDropdown from '@/components/Base/AppDropdown.vue';
  import AppDropdownItem from '@/components/Base/AppDropdownItem.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppLink from '@/components/Base/AppLink.vue';

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
  <div class="dropdown-Leagues" @click="toggleDropdown">
    <div class="dropdown-Leagues__row">
      <app-link :class="{ 'active': isDropdownOpen }" >
        Competitions
      </app-link>
      <app-icon 
        name="arrow"
        size="20px" 
        :style="{ color: isDropdownOpen ? 'var(--color-white)' : 'var(--color-gray)' }"
        :class="{ 'rotated': isDropdownOpen, 'icon-arrow': true }" 
      />
    </div>
    <app-dropdown :active="isDropdownOpen" class="dropdown-Leagues__body">
      <app-dropdown-item 
        v-for="league in leagues" 
        :key="league.id" 
        @click="handleLeagueClick(league.name)"
        class="dropdown-Leagues__item"
      >
        <app-image :imageUrl="league.emblem" class="league-icon" />
        {{ league.name }}
      </app-dropdown-item>
    </app-dropdown>
  </div>
</template>

<style>
  .dropdown-Leagues__item .item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
<style scoped>
  .dropdown-Leagues {
    position: relative;
    cursor: pointer;
  }
  .dropdown-Leagues__row {
    display: flex;
    align-items: center;
  }
  .dropdown-Leagues__body {
    height: 270px;
    overflow: auto;
  }
  .league-icon {
    background-color: var(--color-white);
    border-radius: 2px;
  }
  .icon-arrow {
    transition: transform 0.3s ease-in-out;
  }
  .icon-arrow.rotated {
    transform: rotate(0deg);
    fill: var(--color-gray);
  }
  .active {
    color: var(--color-white);
  }
</style>
