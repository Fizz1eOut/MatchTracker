<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface dropdownProps {
    active?: boolean;
  }
  defineProps<dropdownProps>();

</script>

<template>
  <Transition>
    <div v-if="active" class="dropdown">
      <app-container>
        <ul class="dropdown-list">
          <slot />
        </ul>
      </app-container>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.dropdown {
  position: absolute;
  left: 0px;
  z-index: 10;
  top: 100%;
  background-color: var(--color-underlay);
  box-shadow: 0px 0px 10px 1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  width: 240px;
}
.dropdown-list> *:not(:last-child) {
  margin-bottom: 10px;
}
</style>
