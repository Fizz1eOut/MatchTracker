<script setup lang="ts">
  import { computed } from 'vue';
  import type { Scorer } from '@/interface/scorers.interface';
  import AppTable from '@/components/Base/AppTable.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface ScorersTableProps {
    scorers: Scorer[];
  }
  const props = defineProps<ScorersTableProps>();

  const columns = [
    { label: '#', key: 'index' },
    { label: 'Name', key: 'name' },
    { label: 'Nat', key: 'nationality' },
    { label: 'Club', key: 'club' },
    { label: 'Pos', key: 'position' },
    { label: 'MP', key: 'matches' },
    { label: 'G', key: 'goals' },
    { label: 'A', key: 'assists' }, 
    { label: 'PK', key: 'penalties' }
  ];

  const positionShortMap: Record<string, string> = {
    'Goalkeeper': 'GK',
    'Centre-Back': 'CB',
    'Left-Back': 'LB',
    'Right-Back': 'RB',
    'Defensive Midfield': 'DM',
    'Central Midfield': 'CM',
    'Attacking Midfield': 'AM',
    'Left Midfield': 'LM',
    'Right Midfield': 'RM',
    'Left Winger': 'LW',
    'Right Winger': 'RW',
    'Centre-Forward': 'CF',
    'Second Striker': 'SS',
    'Striker': 'ST',
  };

  const tableData = computed(() => {
    return props.scorers.map((scorer, index) => ({
      id: scorer.player.id,
      index: index + 1,
      name: scorer.player.name,
      nationality: scorer.player.nationality,
      position: positionShortMap[scorer.player.section],
      club: scorer.team.shortName,
      matches: scorer.playedMatches ?? '—',
      goals: scorer.goals ?? '—',
      assists: scorer.assists ?? '—',
      penalties: scorer.penalties ?? '—',
    }));
  });

  const { isMobile: isSmallScreen } = useMediaQuery('(max-width: 526px)');
  const { isMobile: isMediumScreen } = useMediaQuery('(max-width: 560px)');

  const visibleColumns = computed(() => {
    if (isSmallScreen.value) {
      return columns.filter((col) =>
        ['index', 'name', 'club', 'position', 'matches', 'goals'].includes(col.key)
      );
    } else if (isMediumScreen.value) {
      return columns.filter((col) => !['penalties', 'assists'].includes(col.key));
    }
    return columns;
  });
</script>

<template>
  <div class="scorers-table">
    <app-title>
      Top Scorers
    </app-title>
  
    <div class="scorers-table__body">
      <app-table 
        :columns="visibleColumns"
        :data="tableData"
      />
    </div>
  </div>
</template>

<style scoped>
  .scorers-table {
    margin-top: 40px
  }
  .scorers-table__body {
    margin-top: 20px;
  }
  @media (max-width: 991px) {
    :deep(.the-table__header),
    :deep(.the-table__item) {
      grid-template-columns: 40px 170px 100px 120px repeat(4, minmax(20px, 1fr)) 30px;
    }
  }
  @media (max-width: 768px) {
    :deep(.the-table__header),
    :deep(.the-table__item) {
      grid-template-columns: 40px 150px 80px 100px repeat(4, minmax(20px, 1fr)) 30px;
    }
  }
  @media (max-width: 560px) {
    :deep(.the-table__header),
    :deep(.the-table__item) {
      grid-template-columns: 20px 150px 90px repeat(2, minmax(20px, 1fr)) 20px;
    }
    :deep(.the-table__column:first-child) {
      padding-left: 0px;
    }
  }
  @media (max-width: 370px) {
    :deep(.the-table__header),
    :deep(.the-table__item) {
      grid-template-columns: 20px 110px 85px repeat(2, minmax(20px, 1fr)) 20px;
    }
  }
</style>
