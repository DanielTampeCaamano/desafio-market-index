<template>
  <div class="bg-white p-4 rounded-lg shadow flex items-center">
    <input
      v-model="store.searchQuery"
      type="text"
      placeholder="Buscar instrumento..."
      class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/stores/index';

const store = useInstrumentStore();
</script>
