<script setup lang="ts">
  import type { Match } from '@/interface/matches.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppDivider from '@/components/Base/AppDivider.vue';

  interface MatchItemProps {
    match: Match;
    formatMatchTime: (utcDate: string) => string;
    isOngoing: (match: Match) => boolean;
  }
  defineProps<MatchItemProps>();

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
    if (match.status !== 'FINISHED') return ''; // Подсвечиваем только завершенные матчи
    const winner = determineWinner(match);
    if (winner === 'DRAW') return ''; // Ничья — никто не проиграл
    return winner === 'HOME_TEAM' && teamType === 'away' ? 'loser' : 
      winner === 'AWAY_TEAM' && teamType === 'home' ? 'loser' : '';
  };
</script>

<template>
  <div class="match-item">
    <div class="match-item__info">
      <div v-if="isOngoing(match)" class="match__status">
        Live
      </div>
      <div v-else-if="match.status === 'FINISHED'" class="match__status match__status--finished">Finished</div>
      <div v-else class="match__time">
        {{ formatMatchTime(match.utcDate) }}
      </div>
    </div>

    <app-divider />

    <div class="match">
      <div class="match__group" :class="getLoserClass('home', match)">
        <div class="match__row">
          <app-image 
            :imageUrl="match.homeTeam.crest" 
            :alt="match.homeTeam.name" 
            class="logo"
          />
          <div class="match__team">{{ match.homeTeam.name }}</div>
        </div> 
        <div v-if="isOngoing(match) || match.status === 'FINISHED'">
          <div class="match__score">
            {{ match.score.fullTime.home ?? '0' }}
            <div v-if="match.score.penalties?.home !== undefined">
              ({{ match.score.penalties.home }})
            </div>
          </div>
        </div>
      </div>
    
      <div class="match__group" :class="getLoserClass('away', match)">
        <div class="match__row">
          <app-image 
            :imageUrl="match.awayTeam.crest" 
            :alt="match.homeTeam.name" 
            class="logo"
          />
          <div class="match__team">{{ match.awayTeam.name }}</div>
        </div>

        <div v-if="isOngoing(match) || match.status === 'FINISHED'">
          <div class="match__score">
            {{ match.score.fullTime.away ?? '0' }}
            <div v-if="match.score.penalties?.away !== undefined"> 
              ({{ match.score.penalties.away }})
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>
  .match-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out;
  }
  .match-item:hover {
    cursor: pointer;
    background-color: var(--color-secondary-underlay);
  }
  .match-item__info {
    max-width: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
  }
  .match-item__info > div {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :deep(.divider) {
    width: 1px;
    height: 60px;
  }
  .match__team,
  .match__score {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-white);
  }
  .loser {
    color: var(--color-gray);
    opacity: 0.6;
  }
  .match__status {
    color: rgb(211 46 46);
  }
  .match__status--finished {
    font-size: 14px;
    color: var(--color-gray);
  }
  .match {
    width: 100%;
  }
  .match > *:not(:first-child) {
    margin-top: 10px;
  }
  .match__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .match__score {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .match__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
