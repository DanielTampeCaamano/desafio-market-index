import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InstrumentInstrumentsComponent from '@/components/marketindex/InstrumentItemComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

describe('InstrumentInstrumentsComponent', () => {
  // Mock de instrumentos
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
    {
      codeInstrument: 'ANDINA-B',
      shortName: 'ANDINA-B',
      name: 'Embotelladora Andina S.A. Serie B',
      lastPrice: 2805,
      volumeMoney: 36465000,
      pctDay: -0.35,
      pct30D: -3.91,
      pctCY: 28.53,
      pct1Y: 45.09,
      datetimeLastPrice: '2024-06-11 12:05:56',
      accumulatedVolumeMoney: 387220401,
      tend: 'down',
      performanceAbsolute: -9.9,
      performanceRelative: -0.35,
    },
  ];

  it('renderiza correctamente los datos de los instrumentos', () => {
    const wrapper = mount(InstrumentInstrumentsComponent, {
      props: { instruments: mockInstruments },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Verificar que se renderizan los nombres cortos
    expect(wrapper.text()).toContain('AGUAS-A');
    expect(wrapper.text()).toContain('ANDINA-B');

    // Verificar precios formateados
    expect(wrapper.text()).toContain('272.50');
    expect(wrapper.text()).toContain('2805.00');

    // Verificar variaciones formateadas
    expect(wrapper.text()).toContain('+0.78%');
    expect(wrapper.text()).toContain('-0.35%');
  });

  it('aplica colores correctos según la variación', () => {
    const wrapper = mount(InstrumentInstrumentsComponent, {
      props: { instruments: mockInstruments },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Verificar colores para variaciones positivas y negativas
    const positiveVariation = wrapper.findAll('.text-green-600');
    const negativeVariation = wrapper.findAll('.text-red-600');

    expect(positiveVariation.length).toBeGreaterThan(0);
    expect(negativeVariation.length).toBeGreaterThan(0);
  });

  it('resalta el instrumento seleccionado', async () => {
    const wrapper = mount(InstrumentInstrumentsComponent, {
      props: { instruments: mockInstruments },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: { selectedInstrument: mockInstruments[0] },
            },
          }),
        ],
      },
    });

    // Verificar que el instrumento seleccionado tiene la clase de resaltado
    const selectedCell = wrapper.find('.bg-blue-200');
    expect(selectedCell.exists()).toBe(true);
    expect(selectedCell.text()).toBe('AGUAS-A');
  });

  it('dispara la selección al hacer clic en un instrumento', async () => {
    const wrapper = mount(InstrumentInstrumentsComponent, {
      props: { instruments: mockInstruments },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false, // Permite ejecutar acciones reales
          }),
        ],
      },
    });

    const store = useInstrumentStore();
    const spy = vi.spyOn(store, 'selectInstrument');

    // Simular clic en el primer instrumento
    await wrapper.find('td').trigger('click');

    // Verificar que se llamó a la acción con el instrumento correcto
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockInstruments[0]);

    // Limpiar el spy
    spy.mockRestore();
  });

  it('maneja correctamente el espaciador cuando hay un solo instrumento', () => {
    const wrapper = mount(InstrumentInstrumentsComponent, {
      props: { instruments: [mockInstruments[0]] }, // Un solo instrumento
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Verificar que se añade el espaciador
    const spacer = wrapper.find('td[colspan="7"]');
    expect(spacer.exists()).toBe(true);
  });
});
