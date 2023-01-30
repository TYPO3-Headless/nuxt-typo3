import { mount } from '@vue/test-utils'
import T3CeDiv from '../../T3CeDiv/T3CeDiv'
import T3Frame from '../T3Frame.vue'

describe('T3Frame', () => {
  let wrapper
  const prepareFrame = {
    propsData: {
      frameClass: 'custom-class',
      layout: 'custom-layout',
      spaceBefore: 'large',
      spaceAfter: 'extra-large'
    },
    slots: {
      default: [T3CeDiv]
    }
  }

  beforeEach(() => {
    wrapper = mount(T3Frame, prepareFrame)
  })
  it('renders children', () => {
    expect(wrapper.html()).toContain('hr')
  })
  it('has custom frame class', () => {
    expect(wrapper.classes().includes('frame-custom-class')).toBeTruthy()
  })
  it('has custom custom layout', () => {
    expect(wrapper.classes().includes('layout-custom-layout')).toBeTruthy()
  })

  it('has large space at the top', () => {
    expect(wrapper.classes().includes('space-before-large')).toBeTruthy()
  })

  it('has extra-large space at the bottom', () => {
    expect(wrapper.classes().includes('space-after-extra-large')).toBeTruthy()
  })
})
