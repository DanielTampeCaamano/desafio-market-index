<template>
  <div class="flex gap-2">
    <button
    v-for="index in indexList"
    :key="index.key"
      @click="selectInstrument(index.name)"
      class="px-4 py-2 rounded"
      :class="index.name === store.selectedIndex
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 hover:bg-gray-200'">
      {{ index.name  }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useInstrumentStore} from '@/stores/index'
import { onBeforeMount } from 'vue';

const store = useInstrumentStore()
const indexList = [{ name: 'AGUAS-A', key: 0 },
  { name: 'ANDINA-B', key: 1 },
  { name:'BCI', key: 2 },
  { name:'BSANTANDER', key: 3 },
  { name:'CAP', key: 4 },
  { name:'IPSA', key: 5 },];

const selectInstrument = (index: string) => {
  if (store.instruments?.constituents) {
    const instrument = store.instruments.constituents.find(
      (instrument) => instrument.codeInstrument === index
    );
    if (instrument) {
      store.selectInstrument(instrument);
    } else {
      console.warn(`Instrumento con código ${index} no encontrado.`);
    }
  } else {
    console.warn('La lista de instrumentos no está disponible.');
  }
};

onBeforeMount(() => {
  const index = store.selectedIndex;
  if (index) {
    selectInstrument(index);
  } else {
    console.warn('No hay índice seleccionado.');
  }
})

</script>
