// Content element wrapper - Section Frame
// All props are returned from appearance
export default {
  name: 'T3Frame',
  functional: true,
  props: {
    frameClass: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'default'
    },
    spaceAfter: {
      type: String,
      default: 'default'
    },
    spaceBefore: {
      type: String,
      default: 'default'
    }
  },
  render (createElement, { props, children, data }) {
    return createElement(
      'div',
      {
        class: [
          't3-ce-frame',
          `frame-${props.frameClass}`,
          `layout-${props.layout}`,
          `space-before-${
            props.spaceBefore.length ? props.spaceBefore : 'default'
          }`,
          `space-after-${
            props.spaceAfter.length ? props.spaceAfter : 'default'
          }`
        ],
        attrs: data.attrs
      },
      children
    )
  }
}
