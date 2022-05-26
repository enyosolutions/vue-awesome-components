import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AwesomeTable from '@/components/table/AwesomeTable/AwesomeTable.vue'

describe('AwesomeTable.vue', () => {
  it('renders props.identity when passed', () => {
    const wrapper = shallowMount(AwesomeTable, {
      propsData: { entity: 'tabeer', model: {}, schema: {} }
    })
    expect(wrapper.text()).to.include('test')
  })
})
