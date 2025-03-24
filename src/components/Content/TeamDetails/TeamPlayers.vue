<script setup lang="ts">
  import { computed } from 'vue';
  import type { Team, Player } from '@/interface/teams.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';

  interface TeamPlayersProps {
    team: Team | null;
  }
  
  const props = defineProps<TeamPlayersProps>();
  
  const POSITION_MAP: Record<string, string> = {
    'Goalkeeper': 'Goalkeeper',
    'Left-Back': 'Defender',
    'Centre-Back': 'Defender',
    'Right-Back': 'Defender',
    'Defence': 'Defender',
    'Defensive Midfield': 'Midfielder',
    'Central Midfield': 'Midfielder',
    'Attacking Midfield': 'Midfielder',
    'Midfield': 'Midfielder',
    'Left Winger': 'Forward',
    'Right Winger': 'Forward',
    'Centre-Forward': 'Forward',
    'Offence': 'Forward'
  };

  const groupedPlayers = computed(() => {
    if (!props.team?.squad?.length) return [];

    return Object.entries(
      props.team.squad.reduce((acc, player) => {
        const category = POSITION_MAP[player.position] || 'Другие';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(player);
        return acc;
      }, {} as Record<string, Player[]>)
    ).map(([position, players]) => ({ position, players }));
  });
  
</script>

<template>
  <div v-if="team?.squad?.length" class="team__players">
    <app-title class="team-players__title">Squad</app-title>
    <div 
      v-for="group in groupedPlayers" 
      :key="group.position" 
      class="team-players__group"
    >
      <app-subtitle class="team-players__position-title">{{ group.position }}</app-subtitle>
      <ul class="team-players__list">
        <li 
          v-for="player in group.players" 
          :key="player.id" 
          class="team-players__item"
        >
          <div class="player__card">
            <app-underlay>
              <app-container>
                <div class="player__group">
                  <img class="player__img" src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/players/180/254374.jpg" alt="">
                  <div class="player-card__info">
                    <div class="player-card__name">{{ player.name }}</div>
                    <div class="player-card__position">{{ player.position }}</div>
                  </div>
                </div>
                <div class="player__details">
                  <div class="player__nationality">
                    <div>Nationality</div>
                    {{ player.nationality }}
                  </div>
                  <div class="player__birth">
                    <div>Date of Birth</div>
                    {{ player.dateOfBirth }}
                  </div>
                </div>
              </app-container>
            </app-underlay>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .team__players {
    margin-top: 40px;
  }
  .team-players__group {
    margin-top: 30px;
  }
  .team-players__list {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .team-players__item {
    max-width: 280px;
    width: 100%;
  }
  .player__group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .player__img {
    width: 60px;
    height: 60px;
  }
  .player-card__name {
    font-size: 20px;
    font-weight: 400;
    color: var(--color-white);
  }
  .player-card__position {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-gray);
  }
  .player__details {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 16px;
  }
  .player__nationality div,
  .player__birth div {
    font-size: 12px;
    color: var(--color-gray);
  }
  @media (max-width: 499px) {
    .player-card__name {
      font-size: 18px;
    }
  }
</style>
