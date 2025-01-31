<template>
  <div v-if="selectedInstrument" class="bg-white p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
    <div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Cotización: </span>
        <span class="value text-sm sm:text-base">{{ selectedInstrument.price.datetimeLastPrice }}</span>
      </div>
    </div>
    <div class="border-t border-gray-300">
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Nombre de Mercado: </span>
        <span class="value text-sm sm:text-base">{{ selectedInstrument.info.marketName }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Apertura: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.openPrice.toFixed(2) }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Cierre Anterior: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.closePrice.toFixed(2) }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Máximo Diario: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.maxDay.toFixed(2) }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Mínimo Diario: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.minDay.toFixed(2) }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Máximo 52 Semanas: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.max52W.toFixed(2) }}</span>
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Mínimo 52 Semanas: </span>
        <span class="value text-sm sm:text-base">${{ selectedInstrument.price.min52W.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Variación: </span>
        <span class="value text-sm sm:text-base">%</span>
      </div>
    </div>
    <div class="border-t border-gray-300">
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Porcentaje de Variación 1 Mes: </span>
        <span
          class="value text-sm sm:text-base"
          :class="selectedInstrument.price.pct30D > 0 ? 'text-green-600' : 'text-red-600'"
          >{{ (selectedInstrument.price.pct30D * 100).toFixed(2) }}%</span
        >
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Porcentaje de Variación 1 Año: </span>
        <span
          class="value text-sm sm:text-base"
          :class="selectedInstrument.price.pctRelW52 > 0 ? 'text-green-600' : 'text-red-600'"
          >{{ (selectedInstrument.price.pctRelW52 * 100).toFixed(2) }}%</span
        >
      </div>
      <div class="summary-item flex justify-between">
        <span class="label text-sm sm:text-base">Porcentaje de Variación Año a la Fecha: </span>
        <span
          class="value text-sm sm:text-base"
          :class="selectedInstrument.price.pctRelCY > 0 ? 'text-green-600' : 'text-red-600'"
          >{{ (selectedInstrument.price.pctRelCY * 100).toFixed(2) }}%</span
        >
      </div>
    </div>
  </div>
  <div v-else class="p-4 text-center text-gray-500">Nada para mostrar</div>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/stores/index';
import { ref, watch } from 'vue';

const store = useInstrumentStore();
const selectedInstrument = ref(store.summary);

watch(
  () => [store.summary, store.selectedIndex],
  () => {
    selectedInstrument.value = store.summary;
  },
  { deep: true },
);
</script>
