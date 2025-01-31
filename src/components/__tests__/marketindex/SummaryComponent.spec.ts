import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { it, expect, describe } from 'vitest';
import SummaryComponent from '@/components/marketindex/SummaryComponent.vue';
import type { ISummaryData } from '@/types/summary';
import { useInstrumentStore } from '@/stores';

const mockSummaryData: ISummaryData[] = [
  {
    info: {
      marketName: 'Santiago Exchange',
      name: '',
      shortName: '',
      countryName: '',
      currencyName: '',
      currencySymbol: '',
      codeInstrument: '',
      hourOpen: '',
      hourClose: '',
      trading: false,
      exchangeRate: 0,
    },
    price: {
      datetimeLastPrice: '2024-01-01T12:00:00Z',
      openPrice: 4900,
      closePrice: 4950,
      maxDay: 5050,
      minDay: 4900,
      max52W: 5200,
      min52W: 4500,
      pct30D: 0.02,
      pctRelW52: -0.01,
      pctRelCY: 0.05,
      lastPrice: 0,
      datetimeClosePrice: '',
      performanceAbsolute: 0,
      performanceRelative: 0,
      bid: 0,
      bidVolume: 0,
      bidDatetime: '',
      ask: 0,
      askVolume: 0,
      askDatetime: '',
      volumeMoney: 0,
      accumulatedVolumeMoney: 0,
      volumeInstrument: 0,
      accumulatedVolumeInstrument: 0,
      tend: '',
    },
  },
  {
    info: {
      name: 'AGUAS ANDINAS S.A., SERIE A',
      shortName: 'AGUAS-A',
      countryName: 'Chile',
      currencyName: 'Peso Chileno',
      currencySymbol: '$',
      codeInstrument: 'AGUAS-A',
      marketName: 'Bolsa de Santiago',
      hourOpen: '09:30:00',
      hourClose: '16:00:00',
      trading: true,
      exchangeRate: 1,
    },
    price: {
      lastPrice: 272,
      datetimeLastPrice: '06-11-2024 12:51:29',
      openPrice: 275,
      closePrice: 272,
      datetimeClosePrice: '05-11-2024 16:02:02',
      performanceAbsolute: 0,
      performanceRelative: 0,
      bid: 272,
      bidVolume: 27718,
      bidDatetime: '2024-11-06 12:48:10',
      ask: 273.2,
      askVolume: 11725,
      askDatetime: '2024-11-06 12:51:32',
      volumeMoney: 795328,
      accumulatedVolumeMoney: 195762557,
      volumeInstrument: 2924,
      accumulatedVolumeInstrument: 718885,
      tend: 'same',
      maxDay: 275,
      minDay: 272,
      min52W: 253,
      max52W: 294,
      pct30D: 0.7407407407407307,
      pctRelW52: 1.5152646114801938,
      pctRelCY: -4.427266338721014,
    },
  },
];

describe('SummaryComponent', () => {
  it('muestra correctamente los datos del instrumento seleccionado', () => {
    const wrapper = mount(SummaryComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                summary: mockSummaryData[0],
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain('Santiago Exchange');
    expect(wrapper.text()).toContain('4900.00');
    expect(wrapper.text()).toContain('4950.00');
    expect(wrapper.text()).toContain('5050.00');
    expect(wrapper.text()).toContain('4500.00');
    expect(wrapper.text()).toContain('2.00%');
    expect(wrapper.text()).toContain('-1.00%');
    expect(wrapper.text()).toContain('5.00%');
  });

  it('muestra un mensaje si no hay datos de instrumento seleccionado', () => {
    const wrapper = mount(SummaryComponent, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.text()).toContain('Nada para mostrar');
  });
  it('renderiza exitosamente nuevos datos al cambiar el estado global ', async () => {
    const wrapper = mount(SummaryComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                summary: mockSummaryData[0],
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain('Santiago Exchange');

    const store = useInstrumentStore();
    store.summary = mockSummaryData[1];

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Cotización: ' + mockSummaryData[1].price.datetimeLastPrice);
  });
});
