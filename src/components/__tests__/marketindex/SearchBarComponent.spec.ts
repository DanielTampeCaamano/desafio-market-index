import { mount } from '@vue/test-utils';
import { it, expect, describe } from 'vitest';
import SearchBarComponent from '@/components/marketindex/SearchBarComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useInstrumentStore } from '@/stores';

describe('SearchBarComponent', () => {
  it('renderiza el input correctamente', () => {
    const wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('actualiza el store al escribir en el input', async () => {
    const wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const store = useInstrumentStore();
    const input = wrapper.find('input');
    await input.setValue('BCI');

    expect(store.searchQuery).toBe('BCI');
  });
});
