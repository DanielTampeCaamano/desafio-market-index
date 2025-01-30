import type { IConstituent, IConstituentsData } from '@/types/constituents'
import type { IHistoryChartData } from '@/types/history'
import type { ISummaryData } from '@/types/summary'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import instrumentsListData from '@/api/constituyentes/constituensList.json';

import chartDataAguasA from '@/api/history/history-AGUAS-A.json';
import chartDataAndinaB from '@/api/history/history-ANDINA-B.json';
import chartDataBci from '@/api/history/history-BCI.json';
import chartDataBSantander from '@/api/history/history-BSANTANDER.json';
import chartDataCap from '@/api/history/history-CAP.json';
import chartDataIpsa from '@/api/history/history-IPSA.json';

import summaryDataAguasA from '@/api/resumen/AGUAS-A.json';
import summaryDataAndinaB from '@/api/resumen/ANDINA-B.json';
import summaryDataBci from '@/api/resumen/BCI.json';
import summaryDataBSantander from '@/api/resumen/BSANTANDER.json';
import summaryDataCap from '@/api/resumen/CAP.json';
import summaryDataIpsa from '@/api/resumen/IPSA.json';

export type chartPeriodOption = '1D' | '1S' | '1M' | '3M' | '6M' | '1A' | '5A'
export type indexOption = 'AGUAS-A' | 'ANDINA-B' | 'BCI' | 'BSANTANDER' | 'CAP' | 'IPSA'

export const useInstrumentStore = defineStore('instrument', () => {
  const instruments = ref<IConstituentsData | null>(null);
  const selectedInstrument = ref<IConstituent | null>(null);
  const history = ref<IHistoryChartData | null>(null);
  const summary = ref<ISummaryData | null>(null);
  const selectedIndex = ref<indexOption>('IPSA');
  const chartPeriod = ref<chartPeriodOption>('1M')
  const searchQuery = ref<string>('');

  // Acciones

  function fetchInstruments() {
    try {
      const response = instrumentsListData;
      instruments.value = response.data as IConstituentsData;
      if (instruments.value.constituents.length > 0) {
        const instrument= instruments.value.constituents.find((value) => {
          if (value.codeInstrument == selectedIndex.value) {
            return value;
          }
        })
        if (instrument!=null) {
          selectedInstrument.value = instrument;
        }
      }
      fetchInstrumentHistory(selectedIndex.value);
      fetchInstrumentSummary(selectedIndex.value);
    } catch (error) {
      console.error('Error fetching instruments: ',error)
    }
  }

  function fetchInstrumentHistory(codeInstrument: string) {
    let chartData;
    switch (codeInstrument) {
      case 'AGUAS-A':
        chartData = chartDataAguasA;
        break;
      case 'ANDINA-B':
        chartData = chartDataAndinaB;
        break;
      case 'BCI':
        chartData = chartDataBci;
        break;
      case 'BSANTANDER':
        chartData = chartDataBSantander;
        break;
      case 'CAP':
        chartData = chartDataCap;
        break;
      case 'IPSA':
        chartData = chartDataIpsa;
        break;
      default:
        console.error('Invalid instrument code');
        return;
     }
    try {
      const response = chartData;
      history.value = response.data as IHistoryChartData;
    } catch (error) {
      console.error('Error fetching chart data: ', error);
    }
  }

  function fetchInstrumentSummary(codeInstrument: string) {
    let summaryData
    switch (codeInstrument) {
      case 'AGUAS-A':
        summaryData = summaryDataAguasA;
        break;
      case 'ANDINA-B':
        summaryData = summaryDataAndinaB;
        break;
      case 'BCI':
        summaryData = summaryDataBci;
        break;
      case 'BSANTANDER':
        summaryData = summaryDataBSantander;
        break;
      case 'CAP':
        summaryData = summaryDataCap;
        break;
      case 'IPSA':
        summaryData = summaryDataIpsa;
        break;
      default:
        console.error('Invalid instrument code');
        return;
    }
    try {
      const response = summaryData;
      summary.value = response.data as ISummaryData;
    } catch (error) {
      console.error('Error fetching summary data: ', error)
    }
  }

  function selectInstrument(instrument: IConstituent) {
    selectedInstrument.value = instrument;
    setIndex(instrument.codeInstrument as indexOption);
    fetchInstrumentHistory(instrument.codeInstrument);
    fetchInstrumentSummary(instrument.codeInstrument);
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  function setIndex(index: indexOption) {
    selectedIndex.value = index;
  }

  function setPeriod(period: chartPeriodOption) {
    chartPeriod.value = period;
  }

  watch(
    () => selectedIndex.value,
    (newIndex) => {

      fetchInstrumentHistory(newIndex);
      fetchInstrumentSummary(newIndex);
    }
  );


  return {
    fetchInstruments,
    selectInstrument,
    selectedInstrument,
    selectedIndex,
    chartPeriod,
    instruments,
    history,
    summary,
    searchQuery,
    setIndex,
    setPeriod,
    setSearchQuery,
  }
})
