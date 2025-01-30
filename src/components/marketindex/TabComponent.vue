<template>
  <div class="flex gap-2">
    <button v-for="index in indexList" :key="index.key" @click="selectInstrument(index.name)" class="px-4 py-2 rounded"
      :class="index.name === tabIndexSelected
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 hover:bg-gray-200'">
      {{ index.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useInstrumentStore, type indexOption } from '@/stores/index'
import type { IConstituent } from '@/types/constituents';
import { onBeforeMount, ref, watch } from 'vue';
const store = useInstrumentStore()
const tabIndexSelected = ref(store.selectedIndex);
const indexList = [{ name: 'AGUAS-A', key: 0 },
{ name: 'ANDINA-B', key: 1 },
{ name: 'BCI', key: 2 },
{ name: 'BSANTANDER', key: 3 },
{ name: 'CAP', key: 4 },
{ name: 'IPSA', key: 5 },];
const tabInstruments = ref<IConstituent[]>([]);

const loadTabInstruments = () => {
  if (store.instruments?.constituents) {
    // Filtra los instrumentos que están en indexList
    const instruments = store.instruments.constituents.filter((value) => {
      return indexList.some((item) => value.codeInstrument === item.name);
    });

    // Si se encontraron instrumentos, actualiza tabInstruments
    if (instruments.length > 0) {
      tabInstruments.value = instruments;
    } else {
      console.warn('No se encontraron instrumentos para la lista de índices.');
    }
  } else {
    console.warn('La lista de instrumentos no está disponible.');
  }
};

const selectInstrument = (name: string) =>{
  store.setIndex(name as indexOption);
  loadTabInstruments();
  const selectedInstrument = tabInstruments.value.find(
    (value) => value.codeInstrument === name
  );

  if (selectedInstrument) {
    store.selectInstrument(selectedInstrument);
  } else {
    console.warn(`No se encontró el instrumento con código ${name}.`);
  }
}


watch(
  () => store.selectedIndex,
  (newIndex) => {
    tabIndexSelected.value = newIndex;
    loadTabInstruments();
  }
);

onBeforeMount(() => {
  tabIndexSelected.value = store.selectedIndex;
  if (tabIndexSelected.value) {
    loadTabInstruments();
  } else {
    console.warn('No hay índice seleccionado.');
  }
})

</script>
