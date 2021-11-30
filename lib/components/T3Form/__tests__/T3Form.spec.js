import { mount } from '@vue/test-utils'
import T3Form from '../T3Form.vue'

import { elements } from './T3Form.data.json'

const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

function flushPromises () {
  return new Promise(function (resolve) {
    scheduler(resolve)
  })
}

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

describe('T3Form.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      T3Form,
      {
        propsData: {
          elements
        }
      }
    )
  })
  it('render correct fields', () => {
    const emailInput = wrapper.find('input[name="tx_form_formframework[email]"]')
    const nameInput = wrapper.find('input[name="tx_form_formframework[name]"]')
    const phoneInput = wrapper.find('input[name="tx_form_formframework[phone]"]')
    expect(emailInput.exists()).toBe(true)
    expect(nameInput.exists()).toBe(true)
    expect(phoneInput.exists()).toBe(true)
  })

  it('emit submit event if fields valid', async () => {
    const email = wrapper.find('input[id="email"]')
    await email.setValue('test@macopedia.com')

    const name = wrapper.find('input[id="name"]')
    await name.setValue('Jan')

    const phone = wrapper.find('input[id="phone"]')
    await phone.setValue('48123123123')

    wrapper.find('form').trigger('submit')

    await flushPromises()

    const { submit } = wrapper.emitted()
    if (submit.length) {
      expect(submit.length).toBeTruthy()
      expect(submit[0][0].validator.flags.valid).toBeTruthy()
    }
  })

  it('creates correct model', () => {
    expect(Object.keys(wrapper.vm.model).length).toEqual(4)
  })

  it('clears model after form reset', async () => {
    const email = wrapper.find('input[id="message"]')
    await email.setValue('my message in second fieldset')
    await wrapper.vm.resetForm()
    expect(wrapper.vm.model['tx_form_formframework[message]']).toBe('')
  })

  it('can validate email address', async () => {
    const email = wrapper.find('input[id="email"]')
    await email.setValue('test@macopediacom')
    wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    await flushPromises()
    expect(wrapper.html()).toContain('You must enter a valid email address.')
  })

  it('can focus on first error', async () => {
    const email = wrapper.find('input[id="email"]')
    await email.setValue('test@macopediacom')
    wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    await flushPromises()
    expect(scrollIntoViewMock).toBeCalled()
  })
})
