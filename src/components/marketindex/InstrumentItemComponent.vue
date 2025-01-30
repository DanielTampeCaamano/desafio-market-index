<!-- InstrumentPairComponent.vue -->
<template>
  <template v-for="(instrument, idx) in pair" :key="instrument.codeInstrument">
    <!-- Celda Nombre -->
    <td
      @click="selectInstrument(instrument)"
      class="px-4 py-2 font-medium text-gray-900 cursor-pointer hover:bg-blue-300"
      :class="{ 'bg-blue-200': instrument.codeInstrument === store.selectedInstrument?.codeInstrument }"
    >
      {{ instrument.shortName }}
    </td>

    <!-- Celda Último -->
    <td class="px-4 py-2 text-gray-700">
      {{ instrument.lastPrice.toFixed(2) }}
    </td>

    <!-- Celda Monto -->
    <td class="px-4 py-2 text-gray-700">
      {{ instrument.volumeMoney.toLocaleString() }}
    </td>

    <!-- Variaciones con colores condicionales -->
    <td :class="variationColor(instrument.pctDay)" class="px-4 py-2">
      {{ formatVariation(instrument.pctDay) }}
    </td>

    <td :class="variationColor(instrument.pct30D)" class="px-4 py-2">
      {{ formatVariation(instrument.pct30D) }}
    </td>

    <td :class="variationColor(instrument.pctCY)" class="px-4 py-2">
      {{ formatVariation(instrument.pctCY) }}
    </td>

    <td :class="variationColor(instrument.pct1Y)" class="px-4 py-2">
      {{ formatVariation(instrument.pct1Y) }}
    </td>

    <!-- Espaciador entre pares -->
    <td v-if="idx === 0 && props.pair.length === 1" colspan="7"></td>
  </template>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/stores/index'
import type { IConstituent } from '@/types/constituents'

const props = defineProps<{
  pair: IConstituent[]
}>()

const store = useInstrumentStore()

const formatVariation = (value: number) =>
  `${value > 0 ? '+' : ''}${value.toFixed(2)}%`

const variationColor = (value: number) =>
  value >= 0 ? 'text-green-600' : 'text-red-600'

const selectInstrument = (instrument: IConstituent) => {
  store.selectInstrument(instrument)
}
</script>
