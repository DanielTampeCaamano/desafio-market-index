<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useInstrumentStore } from './stores';
import { onBeforeMount } from 'vue';

const instrumentStore = useInstrumentStore();

onBeforeMount(() => {
  instrumentStore.fetchInstruments();
});
</script>

<template>
  
  <div class="h-full w-full bg-gray-200">
    <RouterView />
  </div>
</template>
