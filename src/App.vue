<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useInstrumentStore } from './stores';
import { onBeforeMount } from 'vue';

const instrumentStore = useInstrumentStore();

onBeforeMount(() => {
  instrumentStore.fetchInstruments();
})

</script>

<template>
  <div class="h-full bg-gray-100 dark:bg-gray-700">
    <RouterView />
  </div>
</template>

