import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InstrumentItemComponent from '@/components/marketindex/InstrumentItemComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores/index';
import type { IConstituent } from '@/types/constituents';

describe('InstrumentItemComponent', () => {
  // Mock completo según la interfaz IConstituent
  const mockInstrument: IConstituent[] = [{
    codeInstrument: 'AGUAS-A',
    name: 'Aguas Andinas S.A., Serie A',
    shortName: 'AGUAS-A',
    pctDay: 0.78,
    pct30D: 0.36,
    pctCY: -4.42,
    pct1Y: 1.51,
    lastPrice: 272.5,
    datetimeLastPrice: '2024-06-11 12:00:00',
    volumeMoney: 1500000,
    accumulatedVolumeMoney: 50000000,
    tend: 'up',
    performanceAbsolute: 50.1,
    performanceRelative: 0.78,
  }]

  it('renderiza correctamente los datos del instrumento', () => {
    const wrapper = mount(InstrumentItemComponent, {
      props:{instruments: mockInstrument} ,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // Necesario para spy de acciones
          }),
        ],
      },
    })

    expect(wrapper.text()).toContain('Aguas Andinas')
    expect(wrapper.text()).toContain('$272.50')
    expect(wrapper.text()).toContain('+0.78%')
  })

  it('cambia de color según la variación', async () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: { instruments: mockInstrument },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    // Verificar color inicial
    expect(wrapper.find('.text-green-600').exists()).toBe(true)

    // Actualizar props con variación negativa
    await wrapper.setProps({
      instruments: [{
        ...mockInstrument[0],
        pctDay: -1.5,
        tend: 'down',
      }],
    })

    // Verificar nuevo color
    expect(wrapper.find('.text-red-600').exists()).toBe(true)
  })

  it('dispara la selección al hacer clic', async () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: { instruments: mockInstrument },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    })

    const store = useInstrumentStore()

    // Espiar la acción sin afectar su implementación
    const spy = vi.spyOn(store, 'selectInstrument')

    await wrapper.trigger('click')

    // Verificar llamada con argumento correcto
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockInstrument[0])

    // Limpiar el spy
    spy.mockRestore()
  })
})
