<template>
  <div @click="selectInstrument"
    class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div class="flex justify-between items-center">
      <h3 class="font-semibold">{{ instrument.name }}</h3>
      <span :class="changeColor">{{ formattedChange }}</span>
    </div>
    <div class="flex justify-between mt-2">
      <span class="text-gray-600">Price</span>
      <span class="font-medium">{{ formattedPrice }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/index'
import type { IConstituent } from '@/types/constituents';

const props = defineProps<{
  instrument: IConstituent;
}>()

const store = useInstrumentStore()

const formattedPrice = computed(() => `$${props.instrument.lastPrice.toFixed(2)}`)
const formattedChange = computed(() => `${props.instrument.pctDay > 0 ? '+' : ''}${props.instrument.pctDay.toFixed(2)}%`)
const changeColor = computed(() => props.instrument.pctDay >= 0 ? 'text-green-600' : 'text-red-600')

const selectInstrument = () => {
  store.selectInstrument(props.instrument)
}
</script>
