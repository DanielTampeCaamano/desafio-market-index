import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HeaderComponent from '@/components/marketindex/HeaderComponent.vue';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

describe('HeaderComponent', () => {
  const mockInstrument: IConstituent[] = [
    {
      codeInstrument: 'AGUAS-A',
      name: 'Aguas Andinas S.A., Serie A',
      lastPrice: 272.5,
      pctDay: 0.78,
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
    },
    {
      codeInstrument: 'ANDINA-B',
      name: 'EMBOTELLADORA ANDINA S.A. SERIE B',
      shortName: 'ANDINA-B',
      pctDay: -0.3517,
      pct30D: -3.9611054247696953,
      pctCY: 28.534246575342472,
      pct1Y: 45.097938144329895,
      lastPrice: 2805,
      datetimeLastPrice: '06-11-2024 12:05:56',
      volumeMoney: 36465000,
      accumulatedVolumeMoney: 387220401,
      tend: 'down',
      performanceAbsolute: -9.900000000000091,
      performanceRelative: -0.3517,
    },
  ];

  // Configuración base para todas las pruebas
  const setup = (instrument?: IConstituent | null) => {
    return mount(HeaderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                selectedIndex: 'AGUAS-A',
                selectedInstrument: instrument,
              },
            },
          }),
        ],
      },
    });
  };

  it('renderiza valores por defecto cuando no hay instrumento seleccionado', () => {
    const wrapper = setup(null);

    expect(wrapper.text()).toContain('IPSA, AGUAS-A');
    expect(wrapper.text()).toContain('$0.00');
    expect(wrapper.text()).toContain('+0.00%');
    expect(wrapper.find('.text-green-600').exists()).toBe(true);
  });

  it('muestra correctamente el nombre, precio y variación positiva', () => {
    const wrapper = setup(mockInstrument[0]);

    // Verificar valores principales
    expect(wrapper.text()).toContain('IPSA, AGUAS-A');
    expect(wrapper.text()).toContain('$272.50');
    expect(wrapper.text()).toContain('+0.78%');

    // Verificar clases de color
    expect(wrapper.find('.text-green-600').exists()).toBe(true);
    expect(wrapper.find('.text-red-600').exists()).toBe(false);
  });

  it('muestra variación negativa con color rojo', () => {
    const negativeInstrument = {
      ...mockInstrument[1],
      pctDay: -1.23,
    };

    const wrapper = setup(negativeInstrument);

    expect(wrapper.text()).toContain('-1.23%');
    expect(wrapper.find('.text-red-600').exists()).toBe(true);
    expect(wrapper.find('.text-green-600').exists()).toBe(false);
  });

  it('muestra el índice por defecto cuando no hay selección', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                selectedIndex: null,
                selectedInstrument: null,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain('IPSA, IPSA');
    expect(wrapper.text()).toContain('$0.00');
  });

  it('renderiza el componente TabComponent', () => {
    const wrapper = setup(mockInstrument[1]);
    expect(wrapper.findComponent({ name: 'TabComponent' }).exists()).toBe(true);
  });

  it('actualiza los valores cuando cambia el instrumento', async () => {
    const wrapper = setup(mockInstrument[0]);
    const store = useInstrumentStore();

    // Cambiar instrumento
    const newInstrument = {
      ...mockInstrument[1],
      lastPrice: 280.0,
      pctDay: 2.15,
    };
    store.selectedInstrument = newInstrument;
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('$280.00');
    expect(wrapper.text()).toContain('+2.15%');
  });
});
