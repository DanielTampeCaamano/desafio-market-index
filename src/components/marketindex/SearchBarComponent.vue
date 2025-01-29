<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <input v-model="store.searchQuery" type="text" placeholder="Buscar instrumento..."
      class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/stores/index'

const store = useInstrumentStore()
</script>
