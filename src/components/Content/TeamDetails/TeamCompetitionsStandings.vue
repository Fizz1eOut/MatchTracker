<script setup lang="ts">
  import type { Standings } from '@/interface/standings.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  interface CompetitionStandingsProps {
    standings: Standings | null;
    isLoading: boolean;
  }

  defineProps<CompetitionStandingsProps>();
</script>

<template>
  <div class="competition-standings">
    <app-loading-spinner 
      v-if="isLoading"
      size="60px"
      height="100vh"
    />
    <table v-else-if="standings" class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Played</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in standings.standings[0].table" :key="team.team.id">
          <td>{{ team.position }}</td>
          <td>{{ team.team.name }}</td>
          <td>{{ team.playedGames }}</td>
          <td>{{ team.won }}</td>
          <td>{{ team.draw }}</td>
          <td>{{ team.lost }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="error-message">
      <p>Ошибка: не удалось загрузить таблицу для выбранной лиги. Пожалуйста, попробуйте снова позже.</p>
    </div>
  </div>
</template>

<style scoped>
.standings-table {
  width: 100%;
  border-collapse: collapse;
}
.standings-table th, .standings-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>
