<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import type { Standings, Team } from '@/interface/standings.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppTable from '@/components/Base/AppTable.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';

  interface CompetitionStandingsProps {
    standings: Standings | null;
    isLoading: boolean;
  }
  const props = defineProps<CompetitionStandingsProps>();

  const columns = [
    { label: '#', key: 'position' },
    { label: 'Team', key: 'name', slotName: 'name' },
    { label: 'P', key: 'playedGames' },
    { label: 'W', key: 'won' },
    { label: 'D', key: 'draw' },
    { label: 'L', key: 'lost' },
    { label: 'GF', key: 'goalsFor' },
    { label: 'GA', key: 'goalsAgainst' }, 
    { label: 'P', key: 'points' }
  ];

  const tableData = computed(() => {
    if (!props.standings || !props.standings.standings.length) {
      return [];
    }

    const [standings] = props.standings.standings;

    return standings.table.map(({ team, ...rest }) => ({
      ...rest,
      id: team.id,
      name: team.name,
      imageUrl: team.crest,
    }));
  });

  const { isMobile: isSmallScreen } = useMediaQuery('(max-width: 526px)');
  const { isMobile: isMediumScreen } = useMediaQuery('(max-width: 630px)');

  const visibleColumns = computed(() => {
    if (isSmallScreen.value) {
      return columns.filter((col) =>
        ['position', 'name', 'playedGames', 'won', 'points'].includes(col.key)
      );
    } else if (isMediumScreen.value) {
      return columns.filter((col) => !['goalsFor', 'goalsAgainst'].includes(col.key));
    }
    return columns;
  });

  const router = useRouter();
  const goToTeamPage =  (row: Pick<Team, 'id'>) => {
    router.push({ name: 'team', params: { id: row.id } });
  };
</script>

<template>
  <div class="standings">
    <app-loading-spinner 
      v-if="isLoading"
      size="60px"
      height="200px"
    />
    <app-table 
      v-else-if="standings" 
      :columns="visibleColumns"
      :data="tableData"
      @row-click="goToTeamPage"
    >
      <template #name="{ row }">
        <div class="standings__row">
          <app-image :imageUrl="String(row.imageUrl)" />
          <div class="name">{{ row.name }}</div>
        </div>
      </template>
    </app-table>
    <div v-else class="error-message">
      <p>Error: Failed to load table for selected league. Please try again later.</p>
    </div>
  </div>
</template>

<style scoped>
  .standings__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 630px) {
    :deep(.the-table__header) {
      grid-template-columns: 40px 240px repeat(4, minmax(40px, 1fr)) 40px;
    }
    :deep(.the-table__item) {
      grid-template-columns: 40px 240px repeat(4, minmax(40px, 1fr)) 40px;
    }
  }
  @media (max-width: 526px) {
    :deep(.the-table__header) {
      grid-template-columns: 30px 200px repeat(2, minmax(30px, 1fr)) 20px;
    }
    :deep(.the-table__item) {
      grid-template-columns: 30px 200px repeat(2, minmax(30px, 1fr)) 20px;
    }
    :deep(.the-table__column) {
      font-size: 12px;
    }
    :deep(.the-table__column:first-child) {
      padding-left: 5px;
    }
  }
  @media (max-width: 350px) {
    :deep(.the-table__header) {
      grid-template-columns: 30px 200px repeat(2, minmax(20px, 1fr)) 20px;
    }
    :deep(.the-table__item) {
      grid-template-columns: 30px 200px repeat(2, minmax(20px, 1fr)) 20px;
    }
    :deep(.the-table__column) {
      font-size: 11px;
    }
  }
</style>
