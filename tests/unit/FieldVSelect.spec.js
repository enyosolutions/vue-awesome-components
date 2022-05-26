import { expect } from 'chai'
// import { shallowMount, mount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import FieldVSelect from '@/components/crud/fields/FieldVSelect.vue';

describe('FieldVSelect.vue', () => {
  it('renders props.identity when passed', () => {
    const wrapper = mount(FieldVSelect, {
      propsData: { model: {}, schema: {} }
    })
    expect(wrapper.text()).to.include('test')
  })
})
