import { mount } from '@vue/test-utils'
import T3Debug from '../T3Debug.vue'
import T3DebugData from './T3Debug.data'

describe('T3Debug', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(T3Debug, {
      propsData: T3DebugData
    })
  })
  it('renders all props', () => {
    expect(wrapper.text()).toContain('content')
  })
})
