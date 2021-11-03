import { mount } from '@vue/test-utils'
import T3Dynamic from '../T3Dynamic.js'
import T3DynamicMockData from './T3Dynamic.data'

// Mock CeDynamic
const T3CeTextMock = {
  name: 'T3CeText',
  props: ['id', 'header', 'bodytext'],
  template: '<div class="t3-ce-text-mock"><h1>{{header}}</h1>{{bodytext}}</div>'
}

describe('T3Dynamic', () => {
  it('renders dynamic components based on data', () => {
    const wrapper = mount(T3Dynamic, {
      stubs: { T3CeText: T3CeTextMock },
      propsData: T3DynamicMockData.text
    })
    const components = wrapper.findAllComponents(T3CeTextMock)
    const firstCe = components.at(0)
    expect(firstCe.exists()).toBeTruthy()
  })
})
