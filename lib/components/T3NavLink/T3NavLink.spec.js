import { mount } from '@vue/test-utils'
import T3NavLink from './T3NavLink.vue'

const NuxtLink = {
  props: ['to'],
  template: '<a :href="to"><slot/></a>'
}

describe('T3NavLink', () => {
  it('renders external link', () => {
    const wrapper = mount(T3NavLink, {
      propsData: {
        to: 'https://google.com'
      },
      slots: {
        default: 'google.com'
      }
    })
    expect(wrapper.html()).toContain('<a href="https://google.com" target="_blank" rel="noopener noreferrer">google.com</a>')
  })

  it('renders mailto link', () => {
    const wrapper = mount(T3NavLink, {
      propsData: {
        to: 'mailto:contact@macopedia.com'
      },
      slots: {
        default: 'contact@macopedia.com'
      }
    })
    expect(wrapper.html()).toContain('<a href="mailto:contact@macopedia.com" target="_blank" rel="noopener noreferrer">contact@macopedia.com</a>')
  })

  it('renders phone link', () => {
    const wrapper = mount(T3NavLink, {
      propsData: {
        to: 'tel:123123123'
      },
      slots: {
        default: '123123123'
      }
    })
    expect(wrapper.html()).toContain('<a href="tel:123123123" target="_blank" rel="noopener noreferrer">123123123</a>')
  })

  it('renders internal link', () => {
    const wrapper = mount(T3NavLink, {
      stubs: {
        NuxtLink
      },
      propsData: {
        to: '/'
      },
      slots: {
        default: 'internal link'
      }
    })

    expect(wrapper.html()).toContain('<a href="/">internal link</a>')
  })
})
