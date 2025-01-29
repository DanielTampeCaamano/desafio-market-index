<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <canvas ref="chartCanvas"></canvas>
    <div class="flex gap-4 mt-4">
      <button v-for="period in ['1D' , '1S' ,'1M' , '3M' , '6M' , '1A' , '5A']" :key="period" @click="store.setPeriod(period as chartPeriodOption)"
        class="px-4 py-2 rounded" :class="store.chartPeriod === period
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 hover:bg-gray-200'">
        {{ period }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useInstrumentStore, type chartPeriodOption } from '@/stores/index'
import type { IHistoryChart } from '@/types/history'

const store = useInstrumentStore()
const chartCanvas = ref<HTMLCanvasElement>()
const chartPeriod = ref<chartPeriodOption>(store.chartPeriod)
let chart: Chart | null = null

onMounted(() => {
  initChart()
})

watch(
  () => [store.selectedInstrument, store.chartPeriod],
  () => {
    updateChart()
    chartPeriod.value = store.chartPeriod;
  },
  { deep: true }
)

const initChart = () => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'line',
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    })
  }
}

const getChartData = () => {
  const historyData = [...store.history?.chart || []]

  let filteredData = historyData.reverse();

  switch (store.chartPeriod) {
    case '1D':
      filteredData = filterChartDataByDay(filteredData);
      break;
    case '1S':
      filteredData = filterChartDataByWeek(filteredData);
      break;
    case '1M':
      filteredData = filterChartDataByMonth(filteredData);
      break;
    case '3M':
      filteredData = filterChartDataByThreeMonths(filteredData);
      break;
    case '6M':
      filteredData = filterChartDataBySixMonths(filteredData);
      break;
    case '1A':
      filteredData = filterChartDataByYear(filteredData);
      break;
    case '5A':
      filteredData = filterChartDataByFiveYears(filteredData);
      break;
    default:
      break;
  }

  return {
    labels: filteredData.map((chartData) => `${chartData.datetimeLastPrice.split(' ')[0]}`),
    datasets: [{
      label: 'Historial de precios',
      data: filteredData.map((chartData) =>chartData.lastPrice),
      borderColor: '#3B82F6',
      backgroundColor: '#BFDBFE',
      tension: 0.1,
      fill: true
    }]
  }
}

const filterChartDataByDay = (data: IHistoryChart[]) => {
  return data.slice(0,2).reverse();
}

const filterChartDataByWeek = (data: IHistoryChart[]) => {
  return data.slice(0, 7).reverse();
}

const filterChartDataByMonth = (data: IHistoryChart[]) => {
  return data.slice(0, 30).reverse();
}

const filterChartDataByThreeMonths = (data: IHistoryChart[]) => {
  const today = new Date();
  const ninetyDaysAgo = new Date(today.setMonth(today.getMonth() - 3));
  return data.filter(item => {
    const itemDate = new Date(item.datetimeLastPrice);
    return itemDate >= ninetyDaysAgo;
  }).reverse();
}

const filterChartDataBySixMonths = (data: IHistoryChart[]) => {
  const today = new Date();
  const oneEightyDaysAgo = new Date(today.setMonth(today.getMonth() - 6));
  return data.filter(item => {
    const itemDate = new Date(item.datetimeLastPrice);
    return itemDate >= oneEightyDaysAgo;
  }).reverse();
}

const filterChartDataByYear = (data: IHistoryChart[]) => {
  const today = new Date();
  const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
  return data.filter(item => {
    const itemDate = new Date(item.datetimeLastPrice);
    return itemDate >= oneYearAgo;
  }).reverse();
}

const filterChartDataByFiveYears = (data: IHistoryChart[]) => {
  const today = new Date();
  const fiveYearsAgo = new Date(today.setFullYear(today.getFullYear() - 5));
  return data.filter(item => {
    const itemDate = new Date(item.datetimeLastPrice);
    return itemDate >= fiveYearsAgo;
  }).reverse();
}

const updateChart = () => {
  if (chart) {
    chart.data = getChartData()
    chart.update()
  }
}
</script>
