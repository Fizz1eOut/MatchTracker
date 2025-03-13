<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { getTeamById } from '@/api/teams';
  import type { Match } from '@/interface/matches.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import MatchCountdown from '@/components/Content/MatchList/MatchCountdown.vue';

  interface MatchCardProps {
    match: Match;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
    displayMode: 'countdown' | 'score';
  }

  defineProps<MatchCardProps>();
  const emit = defineEmits(['match-ended']);

  const onMatchEnded = () => {
    emit('match-ended');
  };

  const determineWinner = (match: Match): 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' => {
    const { fullTime, penalties } = match.score;

    // Безопасное извлечение значений (если null, то 0)
    const homeScore = fullTime.home ?? 0;
    const awayScore = fullTime.away ?? 0;

    if (homeScore > awayScore) return 'HOME_TEAM';
    if (homeScore < awayScore) return 'AWAY_TEAM';

    // Проверяем пенальти, если ничья
    const homePenalties = penalties?.home ?? 0;
    const awayPenalties = penalties?.away ?? 0;

    if (homePenalties > awayPenalties) return 'HOME_TEAM';
    if (homePenalties < awayPenalties) return 'AWAY_TEAM';

    return 'DRAW';
  };

  const getLoserClass = (teamType: 'home' | 'away', match: Match) => {
    if (match.status !== 'FINISHED') return '';
    const winner = determineWinner(match);
    if (winner === 'DRAW') return '';
    return winner === 'HOME_TEAM' && teamType === 'away' ? 'loser' : 
      winner === 'AWAY_TEAM' && teamType === 'home' ? 'loser' : '';
  };

  const router = useRouter();
  const goToTeamPage = async (teamId: number) => {
    try {
      const team = await getTeamById(String(teamId));
    
      if (team) {
        router.push(`/team/${teamId}`);
      }
    } catch (error) {
      console.error(`Error loading command ${teamId}:`, error);
      alert('Error loading command. The page will not open.');
    }
  };
</script>

<template>
  <div class="upcoming-match__item match">
    <div class="match__content">
      <div @click="goToTeamPage(match.homeTeam.id)" class="match__item">
        <app-image :imageUrl="match.homeTeam.crest" :alt="match.homeTeam.name" class="logo" />
        <div :class="getLoserClass('home', match)" class="match__team">{{ match.homeTeam.name }}</div>
      </div>

      <div class="match__center">
        <match-countdown 
          v-if="displayMode === 'countdown'" 
          :utcDate="match.utcDate" 
          @match-ended="onMatchEnded" 
        />

        <div v-if="displayMode === 'score'">
          <div v-if="isOngoing(match)" class="match__status">Live</div>

          <div v-if="isOngoing(match) || match.status === 'FINISHED'" class="match__score">
            <span :class="getLoserClass('home', match)">{{ match.score.fullTime.home ?? "0" }}</span> - 
            <span :class="getLoserClass('away', match)">{{ match.score.fullTime.away ?? "0" }}</span>

            <div v-if="match.score.penalties?.home !== undefined">
              ({{ match.score.penalties.home }} - {{ match.score.penalties.away }})
            </div>
          </div>
        </div>
      </div>

      <div class="match__item" @click="goToTeamPage(match.awayTeam.id)">
        <app-image :imageUrl="match.awayTeam.crest" :alt="match.awayTeam.name" class="logo" />
        <div :class="getLoserClass('away', match)" class="match__team">{{ match.awayTeam.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .match__content {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .match__item {
    flex: 0 1 50%;
    cursor: pointer;
  }
  .loser {
    color: var(--color-gray);
    opacity: 0.6;
  }
  .logo {
    width: 100%;
    height: 80px;
    object-fit: contain;
  }
  .match__team {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    color: var(--color-white);
  }
  .match__center {
    display: flex;
    justify-content: center;
    width: 100px;
    text-align: center;
  }
  .match__status {
    color: rgb(211 46 46);
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .match__score {
    font-size: 24px;
    font-weight: 400;
    margin-top: 10px;
    color: var(--color-white);
  }
  @media (max-width: 480px) {
    .match__team,
    .match__score,
    .match__status {
      font-size: 16px;
    }
    .logo {
      height: 60px;
    }
    .match__content {
      padding: 20px 10px;
    }
  }
</style>
