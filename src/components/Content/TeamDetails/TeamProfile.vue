<script setup lang="ts">
  import type { Team } from '@/interface/teams.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface TeamProfileProps {
    team: Team | null;
  }
  defineProps<TeamProfileProps>();
</script>

<template>
  <div v-if="team" class="team-profile">
    <app-title class="team-profile__title">
      General information about the club
    </app-title>
    <app-underlay>
      <app-container size="sm">
        <div class="team-profile__body">
          <div class="team-profile__image">
            <app-image :imageUrl="team.crest" class="team-profile__logo" />
          </div>
          
          <div class="team-profile__group">
            <div class="team-profile__content team-profile__item">
              <app-subtitle class="team-profile__name">
                {{ team.name }}
              </app-subtitle>
              <div class="team-profile__country">
                <app-image :imageUrl="team.area.flag" class="team-profile__flag" />
                {{ team.area.name }}
              </div>
              <div class="team-profile__website">
                <span>Official website:</span>
                <a :href="team.website" target="_blank" class="club-website line">{{ team.website }}</a>
              </div>
            </div>
            <div class="team-profile__info team-profile__item">
              <div><span>Address:</span> {{ team.address }}</div>
              <div><span>Year of foundation:</span> {{ team.founded }} year</div>
              <div><span>Stadium:</span> {{ team.venue }}</div>
              <div><span>Club colours:</span> {{ team.clubColors }}</div>
            </div>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .team-profile__title {
    margin-bottom: 30px;
  }
  .team-profile__body {
    padding: 0 10px;
   display: flex;
   align-items: center;
   gap: 40px;
  }
  .team-profile__logo {
    width: 150px;
    height: 150px;
  }
  .team-profile__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
  .team-profile__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  .team-profile__country {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  .team-profile__flag {
    width: 40px;
    height: 40px;
  }
  .team-profile__website span {
    color: var(--color-gray);
  }
  .team-profile__website {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  .team-profile__website a {
    margin-left: 10px;
    color: var(--color-white);
  }
  .team-profile__info span {
    color: var(--color-gray);
  }
  .team-profile__info {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  .club-website {
  }
</style>
