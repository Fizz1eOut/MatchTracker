<script setup lang="ts">
  interface Column {
    label: string;
    key: string;
    slotName?: string;
  }

  interface Table <T = Record<string, unknown>> {
    data: T[];
    columns: Column[];
    onRowClick?: (row: T) => void;
  }

  const props = defineProps<Table<Record<string, unknown>>>();

  const onRowClick = (row: Record<string, unknown>) => {
    if (props.onRowClick) {
      props.onRowClick(row);
    }
  };
</script>

<template>
  <div class="the-table">
    <div class="the-table__header">
      <div
        v-for="column in props.columns"
        :key="column.key"
        class="the-table__column the-table__header-column"
      >
        <span>{{ column.label }}</span>
      </div>
    </div>

    <div class="the-table__body">
      <div
        v-for="(row, rowIndex) in props.data"
        :key="rowIndex"
        class="the-table__item"
        @click="onRowClick(row)"
      >
        <div
          v-for="column in props.columns"
          :key="column.key"
          class="the-table__column"
        >
          <template v-if="column.slotName">
            <slot
              :name="column.slotName"
              :row="row"
              :value="row[column.key]"
            />
          </template>
          <template v-else>
            {{ row[column.key] }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .the-table {
    display: grid;
    gap: 10px;
    width: 100%;
  }
  .the-table__header {
    display: grid;
    grid-template-columns: 50px 270px repeat(6, minmax(40px, 1fr)) 40px;
    align-items: center;
    width: 100%;
  }
  .the-table__item {
    display: grid;
    grid-template-columns: 50px 270px repeat(6, minmax(40px, 1fr)) 40px;
    align-items: center;
  }
  .the-table__item:hover {
    background-color: var(--color-underlay);
    cursor: pointer;
    border-radius: 10px;
  }
  .the-table__column {
    padding: 10px 0;
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .the-table__column:first-child {
    padding-left: 15px;
  }

  @media (max-width: 768px) {
    .the-table__column {
      padding: 8px 0;
      font-size: 14px;
    }
  }
</style>
