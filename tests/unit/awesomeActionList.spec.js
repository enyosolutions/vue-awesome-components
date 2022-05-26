import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AwesomeActionList from '@/components/misc/AwesomeAction/AwesomeActionList.vue'

describe('AwesomeActionList.vue', () => {
  it('renders props.identity when passed', () => {
    const wrapper = shallowMount(AwesomeActionList, {
      propsData: { entity: 'tabeer', model: {}, schema: {} }
    })
    expect(wrapper.text()).to.include('test')
  })
})
