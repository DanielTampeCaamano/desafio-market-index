<template>
  <div class="bg-white p-6 rounded-lg shadow header">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div class="sm:w-2/3">
        <h1 class="text-2xl font-bold">IPSA, {{ indexName }}</h1>
        <div class="flex items-center gap-4 mt-2">
          <span class="text-3xl font-semibold">{{ formattedPrice }}</span>
          <span :class="changeClass">{{ formattedChange }}</span>
        </div>
      </div>
      <TabComponent class="sm:w-1/3 mt-4 sm:mt-0 md:w-2/3" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useInstrumentStore } from '@/stores/index';
import TabComponent from './TabComponent.vue';

const store = useInstrumentStore();

const indexName = computed(() => store.selectedIndex || 'IPSA');
const formattedPrice = computed(
  () => `$${store.selectedInstrument?.lastPrice.toFixed(2) || '0.00'}`,
);
const formattedChange = computed(() => {
  const change = store.selectedInstrument?.pctDay || 0;
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
});
const changeClass = computed(() =>
  (store.selectedInstrument?.pctDay || 0) >= 0 ? 'text-green-600 text-xl' : 'text-red-600 text-xl',
);
</script>
