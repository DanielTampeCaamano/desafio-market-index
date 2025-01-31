import TabComponent from '@/components/marketindex/TabComponent.vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

// Mock for instruments
const mockInstruments: IConstituent[] = [
  {
    codeInstrument: 'AGUAS-A',
    name: 'AGUAS DE BUENOS AIRES',
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
    codeInstrument: 'BCI',
    name: 'Banco BCI',
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
    codeInstrument: 'IPSA',
    name: 'INDICE PROMEDIO DE PRECIOS SECUNDARIOS DE ACCIONES',
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
];

// Write your test cases
describe('TabComponent', () => {
  it('renderiza correctamente los botones de los índices', () => {
    const wrapper = mount(TabComponent, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(6);
    expect(buttons[0].text()).toBe('AGUAS-A');
    expect(buttons[5].text()).toBe('IPSA');
  });

  it('cambia de índice y llama a setIndex al hacer clic', async () => {
    const wrapper = mount(TabComponent, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const store = useInstrumentStore();
    vi.spyOn(store, 'setIndex');
    vi.spyOn(store, 'selectInstrument');

    const button = wrapper.find('button:nth-child(3)'); // BCI
    await button.trigger('click');

    expect(store.setIndex).toHaveBeenCalledWith('BCI');
  });

  it('llama a selectInstrument si el instrumento existe en el store', async () => {
    const wrapper = mount(TabComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                instruments: { constituents: mockInstruments },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    const store = useInstrumentStore();

    vi.spyOn(store, 'selectInstrument');

    const button = wrapper.find('button:nth-child(3)');
    await button.trigger('click');

    expect(store.selectInstrument).toHaveBeenCalledWith(mockInstruments[1]);
  });
});
