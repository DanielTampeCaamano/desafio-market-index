<template>
  <div v-if="filteredInstruments.length" class="space-y-4">
    <div  v-for="instrument in filteredInstruments" :key="instrument.codeInstrument">
      <InstrumentItemComponent :instrument="instrument" :is-selected="instrument.codeInstrument === store.selectedInstrument?.codeInstrument" />
    </div>
  </div>
  <div v-else>Nada para mostrar</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/index'
import InstrumentItemComponent from './InstrumentItemComponent.vue'

const store = useInstrumentStore()
const filteredInstruments = computed(() => {
  if (store.instruments!=null) {
    if (store.searchQuery!='') {
      return store.instruments.constituents.filter(instrument =>
        instrument.name.toLowerCase().includes(store.searchQuery.toLowerCase())
      )
    }
    return store.instruments.constituents;
  }
  return [];

})

</script>
