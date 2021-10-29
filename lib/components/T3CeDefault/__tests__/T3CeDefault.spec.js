import { mount } from '@vue/test-utils'
import CeDefault from '../T3CeDefault'
import ContentElementData from './T3CeDefault.data'

describe('T3CeDefault', () => {
  let wrapper
  const prepareFrame = {
    propsData: ContentElementData,
    slots: {
      default: [CeDefault]
    }
  }

  beforeEach(() => {
    wrapper = mount(CeDefault, prepareFrame)
  })
  it('renders json fields', () => {
    expect(wrapper.text()).toContain(ContentElementData.content.header)
    expect(wrapper.text()).toContain(ContentElementData.content.subheader)
  })
})
