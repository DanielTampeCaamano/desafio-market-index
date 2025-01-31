import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

describe('Instrument Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('selecciona instrumento correctamente', () => {
    const store = useInstrumentStore();
    const mockInstrument: IConstituent = {
      codeInstrument: 'TEST',
      name: 'Test Instrument',
      lastPrice: 100,
      pctDay: 0.5,
      shortName: '',
      pct30D: 0,
      pctCY: 0,
      pct1Y: 0,
      datetimeLastPrice: '',
      volumeMoney: 0,
      accumulatedVolumeMoney: 0,
      tend: 'same',
      performanceAbsolute: 0,
      performanceRelative: 0,
    };

    store.selectInstrument(mockInstrument);

    expect(store.selectedInstrument).toEqual(mockInstrument);
    expect(store.selectedIndex).toBe('TEST');
  });

  it('filtra instrumentos según query de búsqueda', async () => {
    const store = useInstrumentStore();
    store.instruments = {
      info: {
        name: '',
        shortName: '',
        countryName: '',
        codeInstrument: '',
      },
      constituents: [
        {
          codeInstrument: 'TEST1',
          name: 'Apple Inc',
          shortName: '',
          pctDay: 0,
          pct30D: 0,
          pctCY: 0,
          pct1Y: 0,
          lastPrice: 0,
          datetimeLastPrice: '',
          volumeMoney: 0,
          accumulatedVolumeMoney: 0,
          tend: 'same',
          performanceAbsolute: 0,
          performanceRelative: 0,
        },
        {
          codeInstrument: 'TEST2',
          name: 'Microsoft Corp',
          shortName: '',
          pctDay: 0,
          pct30D: 0,
          pctCY: 0,
          pct1Y: 0,
          lastPrice: 0,
          datetimeLastPrice: '',
          volumeMoney: 0,
          accumulatedVolumeMoney: 0,
          tend: 'same',
          performanceAbsolute: 0,
          performanceRelative: 0,
        },
      ],
    };

    store.setSearchQuery('apple');

    expect(store.filteredInstruments).toHaveLength(1);
    expect(store.filteredInstruments[0].codeInstrument).toBe('TEST1');
  });
});
