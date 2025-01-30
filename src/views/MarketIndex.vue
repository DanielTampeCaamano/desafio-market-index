<template>
  <div class="p-6">
    <div class="grid grid-cols-3 gap-6">
      <!-- Columna izquierda -->
      <div class="col-span-3">
        <SearchBarComponent />
      </div>

      <!-- Columna derecha -->
      <div class="col-span-2 space-y-6">
        <HeaderComponent />
        <ChartComponent />
      </div>
      <div class="col-span-1">
        <SummaryComponent />
      </div>

      <div class="col-span-3 space-y-6">
        <InstrumentListComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBarComponent from '@/components/marketindex/SearchBarComponent.vue'
import InstrumentListComponent from '@/components/marketindex/InstrumentListComponent.vue'
import HeaderComponent from '@/components/marketindex/HeaderComponent.vue'
import ChartComponent from '@/components/marketindex/ChartComponent.vue'
import SummaryComponent from '@/components/marketindex/SummaryComponent.vue'
</script>
