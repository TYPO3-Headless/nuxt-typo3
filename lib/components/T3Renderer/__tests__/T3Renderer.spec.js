import { mount } from '@vue/test-utils'
import T3Frame from '../../T3Frame/T3Frame.vue'
import T3Dynamic from '../../T3Dynamic/T3Dynamic.js'
import T3Renderer from '../T3Renderer.js'
import T3RendererMockData from './T3Renderer.data'

// Mock T3Dynamic
const T3DynamicMock = {
  props: ['data', 'type', 'index'],
  template: '<div class="t3-ce-dnymaic">{{JSON.stringify($props)}}</div>'
}

// Mock T3Frame
const T3FrameMock = {
  template: '<div class="t3-ce-frame"><slot/></div>'
}

const CeDefault = {
  props: ['data', 'type', 'index'],
  template: '<div class="t3-ce-default">{{JSON.stringify($props)}}</div>'
}

describe('T3Renderer with mocked components', () => {
  let wrapper
  let components
  let frames

  // we have to wrapp it because T3Renderer renders multiple nodes on root level
  const wrappedRenderer = {
    inheritAttrs: false,
    components: { T3Renderer },
    template: '<div><T3Renderer v-bind="$attrs"/></div>'
  }

  const prepareFrame = {
    stubs: { T3Frame: T3FrameMock, T3Dynamic: T3DynamicMock },
    propsData: T3RendererMockData
  }

  beforeEach(() => {
    wrapper = mount(wrappedRenderer, prepareFrame)
    components = wrapper.findAllComponents(T3DynamicMock)
    frames = wrapper.findAllComponents(T3FrameMock)
  })

  it('renders children and pass type', () => {
    const firstCe = components.at(0)
    expect(firstCe.exists()).toBeTruthy()
    expect(firstCe.props('type')).toBe('text')
    const secondCe = components.at(1)
    expect(secondCe.exists()).toBeTruthy()
    expect(secondCe.props('type')).toBe('textpic')
  })

  it('renders exactly 2 components', () => {
    expect(components).toHaveLength(2)
  })

  it('renders only one frame', () => {
    expect(frames).toHaveLength(1)
  })

  it('does not render frames at all', () => {
    wrapper = mount(wrappedRenderer, {
      ...prepareFrame,
      propsData: {
        ...{ T3RendererMockData },
        frame: false
      }
    })
    frames = wrapper.findAllComponents(T3FrameMock)
    expect(frames).toHaveLength(0)
  })

  it('render ID attribute on frame or component', () => {
    const firstCe = components.at(0)
    expect(firstCe.exists()).toBeTruthy()
    expect(frames.at(0).attributes('id')).toBe('c72')
    const secondCe = components.at(1)
    expect(secondCe.exists()).toBeTruthy()
    expect(secondCe.attributes('id')).toBe('c35')
  })
})

describe('T3Renderer with true components', () => {
  let wrapper
  let components
  let frames

  // we have to wrapp it because T3Renderer renders multiple nodes on root level
  const wrappedRenderer = {
    inheritAttrs: false,
    components: { T3Renderer },
    template: '<div><T3Renderer v-bind="$attrs"/></div>'
  }

  const prepareFrame = {
    stubs: {
      T3Dynamic,
      T3Frame,
      T3CeText: CeDefault,
      T3CeTextpic: CeDefault,
      T3CeHeader: true,
      T3HtmlParser: true
    },
    mocks: {
      $nuxt: {
        $typo3: {
          options: {
            debug: false
          }
        }
      }
    },
    propsData: T3RendererMockData
  }

  beforeEach(() => {
    wrapper = mount(wrappedRenderer, prepareFrame)
    components = wrapper.findAllComponents(T3Dynamic)
    frames = wrapper.findAllComponents('.t3-ce-frame')
  })

  it('renders children and pass type', () => {
    const firstCe = components.at(0)

    expect(firstCe.exists()).toBeTruthy()
    expect(firstCe.props('type')).toBe('text')

    const secondCe = components.at(1)
    expect(secondCe.exists()).toBeTruthy()

    expect(true).toBeTruthy()
  })

  it('renders exactly 2 components', () => {
    expect(components).toHaveLength(2)
  })

  it('does not render frames at all', () => {
    wrapper = mount(wrappedRenderer, {
      ...prepareFrame,
      propsData: {
        ...{ T3RendererMockData },
        frame: false
      }
    })
    frames = wrapper.findAllComponents(T3Frame)
    expect(frames).toHaveLength(0)
  })

  it('render ID attribute on frame or component', () => {
    const firstCe = components.at(0)
    expect(firstCe.exists()).toBeTruthy()
    expect(frames.at(0).attributes('id')).toBe('c72')
    const secondCe = components.at(1)
    expect(secondCe.exists()).toBeTruthy()
    expect(secondCe.attributes('id')).toBe('c35')
  })
})
