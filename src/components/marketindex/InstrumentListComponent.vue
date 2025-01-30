<!-- InstrumentListComponent.vue -->
<template>
  <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
    <table class="min-w-full divide-y divide-gray-200 text-xs">
      <thead class="bg-gray-50">
        <tr>
          <th colspan="14" class="px-4 py-3 text-left font-medium text-gray-700 uppercase bg-gray-100">
            IPSA
          </th>
        </tr>
        <tr>
          <!-- Columnas para dos instrumentos por fila -->
          <template v-for="(_, index) in 2" :key="index">
            <th class="px-4 py-2 text-left font-medium text-gray-600 w-32">Nombre</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">Último*</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">Monto (Mt)</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">Var. Día</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">Var. 30D</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">Año Actual</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600">12 Meses</th>
          </template>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <!-- Agrupar instrumentos en pares -->
        <tr v-for="(pair, index) in instrumentPairs" :key="index" class="bg-gray-200">
          <InstrumentItemComponent :pair="pair" />
        </tr>

        <!-- Mensaje cuando no hay resultados -->
        <tr v-if="filteredInstruments.length === 0">
          <td colspan="14" class="p-4 text-center text-gray-500">
            No se encontraron resultados. Intente otra búsqueda.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/index'
import InstrumentItemComponent from './InstrumentItemComponent.vue'

const store = useInstrumentStore()

const filteredInstruments = computed(() => {
  if (!store.instruments) return []
  return store.searchQuery
    ? store.instruments.constituents.filter(instrument =>
      instrument.name.toLowerCase().includes(store.searchQuery.toLowerCase())
    )
    : store.instruments.constituents
})

// Agrupar instrumentos en pares para dos columnas
const instrumentPairs = computed(() => {
  const pairs = []
  for (let i = 0; i < filteredInstruments.value.length; i += 2) {
    pairs.push(filteredInstruments.value.slice(i, i + 2))
  }
  return pairs
})
</script>
