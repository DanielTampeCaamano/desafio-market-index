import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InstrumentListComponent from '@/components/marketindex/InstrumentListComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

describe('InstrumentListComponent con Store', () => {
  const mockInstruments: IConstituent[] = [
    {
      codeInstrument: 'AGUAS-A',
      shortName: 'AGUAS-A',
      name: 'Aguas Andinas S.A., Serie A',
      lastPrice: 272.5,
      volumeMoney: 1500000,
      pctDay: 0.78,
      pct30D: -1.23,
      pctCY: 4.56,
      pct1Y: -2.34,
      datetimeLastPrice: '2024-06-11 12:00:00',
      accumulatedVolumeMoney: 50000000,
      tend: 'up',
      performanceAbsolute: 50.1,
      performanceRelative: 0.78,
    },
  ];

  it('renderiza los instrumentos filtrados desde el store', () => {
    const wrapper = mount(InstrumentListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                instruments: { constituents: mockInstruments },
                searchQuery: 'aguas',
              },
            },
          }),
        ],
      },
    });

    // Verificar que el componente muestra el instrumento filtrado
    expect(wrapper.text()).toContain('AGUAS-A');
  });

  it('actualiza la lista al cambiar la búsqueda en el store', async () => {
    const wrapper = mount(InstrumentListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                instruments: { constituents: mockInstruments },
                searchQuery: '',
              },
            },
          }),
        ],
      },
    });

    const store = useInstrumentStore();

    // Cambiar la búsqueda en el store
    store.setSearchQuery('aguas');
    await wrapper.vm.$nextTick();

    // Verificar que la lista se actualiza
    expect(wrapper.text()).toContain('AGUAS-A');
    expect(wrapper.text()).not.toContain('BCI');
  });
});
