import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores/index';
import ChartComponent from '@/components/marketindex/ChartComponent.vue';
import type { IHistoryChartData } from '@/types/history';

// Mock completo de Chart.js
vi.mock('chart.js/auto', () => ({
  default: vi.fn().mockImplementation(() => ({
    update: vi.fn(),
    destroy: vi.fn(),
  })),
}));

const mockData: IHistoryChartData = {
  info: {
    name: 'AGUAS ANDINAS S.A., SERIE A',
    shortName: 'AGUAS-A',
    countryName: 'Chile',
    currencyName: 'Peso Chileno',
    currencySymbol: '$',
    codeInstrument: 'AGUAS-A',
    hourOpen: '09:30:00',
    hourClose: '16:00:00',
  },
  chart: [
    {
      datetimeLastPrice: '06-11-2023 09:00:00',
      datetimeLastPriceTs: 1699272000,
      lastPrice: 267.94,
      highPrice: 270,
      lowPrice: 265.26,
      openPrice: 267.94,
      closePrice: 267.94,
      volume: 7348145,
      volumeMoney: 1962725971,
      performanceRelative: 0,
      performanceAbsolute: 0,
      tend: 'same',
    },
    {
      datetimeLastPrice: '07-11-2023 09:00:00',
      datetimeLastPriceTs: 1699358400,
      lastPrice: 268.8,
      highPrice: 269.91,
      lowPrice: 264,
      openPrice: 267,
      closePrice: 268.8,
      volume: 1597419,
      volumeMoney: 426158540,
      performanceRelative: 0.320967,
      performanceAbsolute: 0.86,
      tend: 'up',
    },
    {
      datetimeLastPrice: '08-11-2023 09:00:00',
      datetimeLastPriceTs: 1699444800,
      lastPrice: 268,
      highPrice: 269,
      lowPrice: 262.23,
      openPrice: 269,
      closePrice: 268,
      volume: 1177852,
      volumeMoney: 313802630,
      performanceRelative: -0.297619,
      performanceAbsolute: -0.8,
      tend: 'down',
    },
    {
      datetimeLastPrice: '09-11-2023 09:00:00',
      datetimeLastPriceTs: 1699531200,
      lastPrice: 265.05,
      highPrice: 269.5,
      lowPrice: 264,
      openPrice: 265.22,
      closePrice: 265.05,
      volume: 1463742,
      volumeMoney: 388937278,
      performanceRelative: -1.100746,
      performanceAbsolute: -2.95,
      tend: 'down',
    },
    {
      datetimeLastPrice: '10-11-2023 09:00:00',
      datetimeLastPriceTs: 1699617600,
      lastPrice: 272,
      highPrice: 272,
      lowPrice: 261,
      openPrice: 264,
      closePrice: 272,
      volume: 2988331,
      volumeMoney: 802351282,
      performanceRelative: 2.622147,
      performanceAbsolute: 6.95,
      tend: 'up',
    },
    {
      datetimeLastPrice: '13-11-2023 09:00:00',
      datetimeLastPriceTs: 1699876800,
      lastPrice: 273,
      highPrice: 277,
      lowPrice: 267.03,
      openPrice: 277,
      closePrice: 273,
      volume: 2358489,
      volumeMoney: 640859242,
      performanceRelative: 0.367647,
      performanceAbsolute: 1,
      tend: 'up',
    },
    {
      datetimeLastPrice: '14-11-2023 09:00:00',
      datetimeLastPriceTs: 1699963200,
      lastPrice: 273,
      highPrice: 273.97,
      lowPrice: 268,
      openPrice: 273,
      closePrice: 273,
      volume: 1805950,
      volumeMoney: 492746815,
      performanceRelative: 0,
      performanceAbsolute: 0,
      tend: 'same',
    },
  ],
};

describe('ChartComponent', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(ChartComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                selectedIndex: 'AGUAS-A',
              },
              history: mockData,
            },
            stubActions: false,
          }),
        ],
      },
    });
    expect(wrapper.find('canvas').exists()).toBe(true);
  });

  it('cambia de periodo y llama a setPeriod al hacer clic en un botón', async () => {
    const wrapper = mount(ChartComponent, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const store = useInstrumentStore();
    vi.spyOn(store, 'setPeriod');

    const button = wrapper.find('button:nth-child(3)'); // 1M
    await button.trigger('click');

    expect(store.setPeriod).toHaveBeenCalledWith('1M');
  });
});
