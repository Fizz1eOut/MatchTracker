<script setup lang="ts">
  import {  watch } from 'vue';

  const props = defineProps<{
    active: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'change', value: boolean): void;
  }>();

  const toggleBurger = () => {
    emit('change', !props.active);
  };

  watch(() => props.active, (value) => {
    document.body.style.overflow = value ? 'hidden' : '';
  });
</script>

<template>
  <button 
    @click="toggleBurger"
    :class="{ 'burger--active': active }"
    class="burger"
  >
    <span class="burger__line"></span>
  </button>
</template>

<style scoped>
  .burger {
    width: 30px;
    height: 16px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    position: relative;
    z-index: 11;
  }
  @media (max-width: 991px) {
    .burger {
      display: block;
    }
    .burger::before,
    .burger::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 2px;
      background: var(--color-white);
      transition: transform 0.3s ease-in-out, top 0.3s ease-in-out, bottom 0.3s ease-in-out, color 0.3s ease-in-out;
    }
    .burger::after {
      top: auto;
      bottom: 0;
    }
    .burger span {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 2px;
      display: inline-block;
      background: var(--color-white);
    }
    .burger--active .burger__line {
      opacity: 0;
    }
    .burger--active::before {
      top: 50%;
      transform: rotate(45deg);
      background-color: var(--color-gray);
    }
    .burger--active::after {
      bottom: auto;
      top: 50%;
      transform: rotate(-45deg);
      background-color: var(--color-gray);
    }
  }
</style>
